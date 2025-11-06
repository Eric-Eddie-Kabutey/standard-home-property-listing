'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Star, Zap, Shield, Clock, ArrowRight, Smartphone, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Plan = {
  id: string;
  name: string;
  price: number;
  recurring: boolean;
  save?: string;
};

type PaymentMethod = 'qmoney' | 'wave' | 'aps' | 'nafa' | 'yonna';

export default function PlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qmoney');
  const [promoCode, setPromoCode] = useState('');
  const [useUSSD, setUseUSSD] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const plans: Record<string, Plan> = {
    '2week': { id: '2week', name: '2-week plan', price: 26, recurring: false },
    '1month': { id: '1month', name: '1-month plan', price: 34, recurring: true, save: '32%' },
    '3month': { id: '3month', name: '3-month plan', price: 68, recurring: true, save: '43%' },
  };

  const getBasePrice = (): number => (selectedPlan ? plans[selectedPlan.id].price : 0);

  const getTotal = (): number => {
    const base = getBasePrice();
    return promoCode === 'WELCOME10' ? base * 0.9 : base;
  };

  const ussdCodes = {
    qmoney: '*220#',
    wave: '*343#',
    aps: '*929#',
    nafa: '*888#',
    yonna: '*144#',
  };

  const handlePayment = () => {
    if (!selectedPlan || !email) return;

    const total = getTotal();

    const userProfile = {
      plan: selectedPlan.id,
      subscribedAt: new Date().toISOString(),
      email,
      paymentMethod,
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    const method = paymentMethod;
    const planId = selectedPlan.id;

    if (useUSSD) {
      navigator.clipboard.writeText(ussdCodes[method]);
      alert(`Dial ${ussdCodes[method]} on your phone to pay D${total}. Enter amount: ${total} and reference: ${planId}-${email}`);
    } else if (method === 'qmoney') {
      window.open(`https://qmoney.gm/pay?amount=${total}&email=${email}&plan=${planId}`, '_blank');
    }

    setShowReceipt(true);
    setIsCheckoutOpen(false);
  };

  const sendWhatsApp = () => {
    const total = getTotal();
    const date = new Date().toLocaleDateString('en-GM');
    const receiptText = `Standard Home Receipt\n\nPlan: ${selectedPlan?.name}\nAmount: D${total}\nDate: ${date}\nEmail: ${email}\nMethod: ${paymentMethod.toUpperCase()}\n\nThank you for subscribing!`;
    const supportNumber = '+2203944917';
    window.open(`https://wa.me/${supportNumber}?text=${encodeURIComponent(receiptText)}`, '_blank');
    router.push(`/success?method=${paymentMethod}&plan=${selectedPlan?.id}&total=${total}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 py-12 px-4">
      <div className="mx-auto max-w-5xl space-y-16">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Choose the plan that’s right for you</h1>
          <p className="mt-3 text-lg text-gray-600">Flexible plans that adapt to your search timeline. Cancel anytime.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(plans).map(([key, plan]) => (
            <Card
              key={key}
              className={`p-6 border-2 cursor-pointer transition-all ${
                selectedPlan?.id === key
                  ? 'border-indigo-600 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="text-indigo-600">{plan.name}</Badge>
                <div className="text-right">
                  {plan.save && <span className="text-sm text-gray-500 line-through">D{key === '1month' ? 50 : 120}</span>}
                  <span className="ml-2 text-3xl font-bold">D{plan.price}</span>
                </div>
              </div>
              {plan.save && <Badge variant="secondary" className="mb-4">Save {plan.save}</Badge>}
              <Button
                variant={selectedPlan?.id === key ? 'default' : 'outline'}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan);
                }}
              >
                {selectedPlan?.id === key ? 'Selected' : 'Select'}
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-white to-indigo-50 shadow-xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative text-center py-12 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Ready to find your perfect home?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful renters who found their home faster with Standard Home.
            </p>

            {selectedPlan && (
              <div className="mb-6 inline-block bg-white rounded-lg px-6 py-3 shadow-md border-2 border-indigo-100">
                <p className="text-sm text-gray-600">Your selected plan:</p>
                <p className="text-xl font-bold text-indigo-600">
                  {selectedPlan.name} - D{selectedPlan.price}
                  {selectedPlan.save && (
                    <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Save {selectedPlan.save}
                    </span>
                  )}
                </p>
              </div>
            )}

            <Button
              size="lg"
              disabled={!selectedPlan}
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              {selectedPlan ? (
                <>
                  Activate Your Plan Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                'Please Select a Plan Above'
              )}
            </Button>

            {!selectedPlan && (
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <span className="animate-bounce">☝️</span>
                Choose your preferred plan from the pricing options above
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                100% money-back guarantee
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                2,450+ satisfied customers
              </span>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Standard Home?</h2>
          <p className="mt-2 text-gray-600">Join thousands who have found their perfect home faster with our intelligent rental search platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Zap className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Lightning-Fast Alerts</h3>
            <p className="text-sm text-gray-600 mt-2">
              Be the first to know about new listings with our real-time notification system.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Shield className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Trusted & Secure</h3>
            <p className="text-sm text-gray-600 mt-2">
              Join over 2,450+ satisfied customers.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Save Time & Energy</h3>
            <p className="text-sm text-gray-600 mt-2">
              Let our AI do the work while you focus on what matters.
            </p>
          </Card>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">What our users are saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mark Agustsson',
                role: 'Teacher in Banjul',
                text: 'Standard Home made finding a cozy apartment in Banjul so easy! The real-time alerts helped me snag a great deal before it was gone.',
                image: '/assets/images/users/gambian-user-1.png',
              },
              {
                name: 'Musa Jallow',
                role: 'Business Owner in Serekunda',
                text: "As a busy shop owner, I needed something quick and affordable. The app's notifications got me a furnished house in just days!",
                image: '/assets/images/users/gambian-user-2.png',
              },
              {
                name: 'Fatou Bah',
                role: 'Nurse in Brikama',
                text: "I was worried about family-friendly rentals near Brikama hospital. Standard Home's filters found us a perfect home with a garden.",
                image: '/assets/images/users/gambian-user-3.png',
              },
            ].map((t, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-indigo-100">
                    <Image
                      src={t.image}
                      alt={`Testimonial from ${t.name}`}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">&quot;{t.text}&quot;</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Checkout Modal */}
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-lg p-0 rounded-lg overflow-hidden" style={{ maxHeight: '85vh' }}>
            <div className="flex flex-col h-full max-h-[85vh]">
              {/* Header */}
              <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 p-3 sm:p-4 text-white flex-shrink-0">
                <DialogTitle className="text-base sm:text-xl font-semibold">Subscribe to Standard Home Premium</DialogTitle>
                <p className="text-xl sm:text-2xl font-bold mt-1">D{getTotal()}.00</p>
                <p className="text-xs sm:text-sm opacity-90 mt-1">
                  Billed {selectedPlan?.recurring ? 'monthly' : 'once'}. Cancel anytime.
                </p>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>D{getBasePrice()}.00</span>
                </div>

                <div>
                  <Input
                    placeholder="Add promotion code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs sm:text-sm"
                  />
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold">
                  <span>Total due today</span>
                  <span>D{getTotal()}.00</span>
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="ussd" className="rounded" checked={useUSSD} onChange={(e) => setUseUSSD(e.target.checked)} />
                  <Label htmlFor="ussd" className="text-xs sm:text-sm cursor-pointer">
                    USSD Mode (for no-internet users)
                  </Label>
                </div>

                <div>
                  <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                    <div className="space-y-2">
                      {[
                        { value: 'qmoney', label: 'QMoney', icon: Smartphone, ussd: '*220#' },
                        { value: 'wave', label: 'Wave', icon: Smartphone, ussd: '*343#' },
                        { value: 'aps', label: 'APS', icon: Smartphone, ussd: '*929#' },
                        { value: 'nafa', label: 'NaFa', icon: Banknote, ussd: '*888#' },
                        { value: 'yonna', label: 'Yonna', icon: Smartphone, ussd: '*144#' },
                      ].map((method) => (
                        <div key={method.value} className="flex items-center space-x-2 p-2 sm:p-3 rounded-md border hover:bg-gray-50 transition">
                          <RadioGroupItem value={method.value} id={method.value} />
                          <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer flex-1 text-xs sm:text-sm">
                            <method.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                            {method.label}
                            {useUSSD && <span className="text-xs text-gray-400 ml-auto">Dial {method.ussd}</span>}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <input type="checkbox" id="save-info" className="rounded" />
                  <Label htmlFor="save-info" className="cursor-pointer">
                    Save my information for faster checkout
                  </Label>
                </div>
              </div>

              {/* Pay Button */}
              <div className="flex-shrink-0 p-3 sm:p-4 border-t bg-white">
                <Button onClick={handlePayment} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 sm:py-5 text-sm sm:text-lg font-semibold">
                  Pay D{getTotal()}.00
                </Button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  <a href="#" className="underline">Terms</a> • <a href="#" className="underline">Privacy</a>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Receipt Preview Modal */}
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="max-w-md p-6">
            <div className="space-y-4 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="text-sm text-gray-600">Your plan has been activated successfully.</p>
              <div className="text-left bg-gray-50 p-4 rounded-md border">
                <p><strong>Plan:</strong> {selectedPlan?.name}</p>
                <p><strong>Amount:</strong> D{getTotal()}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
              </div>
              <Button onClick={sendWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Send Receipt via WhatsApp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
import Hero from '@/components/solution/hero'
import FeatureDetailSection from '@/components/solution/feature-detaill'
import Image from 'next/image'

// Visual element for Section 1 (Logos)
const PartnerLogos = () => (
	<div className='grid grid-cols-2 gap-x-8 gap-y-10 w-full max-w-md'>
		{/* Replace with actual logo images */}
		<div className='relative h-10'>
			<Image
				src='/logos/pararius.svg'
				alt='Pararius'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/hollandstay.svg'
				alt='Holland Stay'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/nestpick.svg'
				alt='Nestpick'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/funda.svg'
				alt='Funda'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/kamer.svg'
				alt='Kamer.nl'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/iam-expat.svg'
				alt='I am Expat'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image
				src='/logos/ikwilhuren.svg'
				alt='ikwilhuren'
				fill
				className='object-contain'
			/>
		</div>
		<div className='relative h-10'>
			<Image src='/logos/vbo.svg' alt='VBO' fill className='object-contain' />
		</div>
	</div>
)

const PhoneMockup = () => (
	<div className='relative w-[250px] h-[500px] md:w-[280px] md:h-[560px]'>
		<Image
			src='/phone-mockup.png'
			alt='RentHunter on a phone'
			fill
			className='object-contain'
		/>
	</div>
)

const ConnectIllustration = () => (
	<div className='relative w-full max-w-lg aspect-square'>
		<Image
			src='/connect-illustration.svg'
			alt='Connect and stand out illustration'
			fill
			className='object-contain'
		/>
	</div>
)

export default function OurSolutionPage() {
	return (
		<>
			{/* Hero section */}
			<Hero />

			{/* Feature Detail section */}
			<FeatureDetailSection
				imageSide='right'
				title='Stop searching, start finding'
				description='Tired of endless scrolling? We scan 100+ rental sites and centralize all listings on one platform, saving you hours and simplifying your search.'
				visualElement={<PartnerLogos />}
			/>

			<FeatureDetailSection
				imageSide='left'
				title='Personalized support'
				description="We don't just show listings we guide you. From tailored recommendations based on your preferences to insights on the best neighborhoods, RentHunter ensures your search is efficient and stress-free."
				visualElement={<PhoneMockup />}
			/>

			<FeatureDetailSection
				imageSide='right'
				title='Connect and stand out'
				description={
					<>
						<span className='text-pink-600'>Contact</span> landlords directly
						through our platform for faster responses. Access exclusive tips and
						hacks to increase your chances of securing your dream apartment.
					</>
				}
				visualElement={<ConnectIllustration />}
			/>
		</>
	)
}

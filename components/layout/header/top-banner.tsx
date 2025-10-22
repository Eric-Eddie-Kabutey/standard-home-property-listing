'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const TopBanner = () => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<div className='flex gap-3 items-center justify-around md:justify-center bg-[#ff4757] text-white py-2 px-10 md:px-4 text-center'>
			<p className='text-sm'>
				🚨 Limited Time Offer! Click Here for Special Discount
			</p>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<p className='border-none cursor-pointer rounded-lg bg-[#ee404e]'>
						<MoveRight className='w-4 h-auto' />
					</p>
				</DialogTrigger>
				<DialogContent className='bg-[#7FB5E3] p-0'>
					<div className='aspect-video'>
						<video
							autoPlay
							muted
							loop
							className='w-full h-full object-cover'
							controls>
							<source src='/houseVid.mp4' type='video/mp4' />
							Your browser does not support the video tag.
						</video>
						<div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[100%] max-w-[755px]'>
							<Link
								href='https://wa.me/+2207922004'
								className=' bg-[#ee404e] text-white py-2 px-6 rounded-lg
                                flex items-center justify-center hover:bg-[#ff5765]
                                transition-colors duration-200 shadow-lg'>
								<span className='font-semibold text-lg'>
									Book Reservation Now
								</span>
							</Link>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default TopBanner

import {
	Info,
	FileText,
	Newspaper,
	Calendar,
	Users,
	Rocket,
} from 'lucide-react'
import { NavItem } from '../types/navigation'

export const navigationData: NavItem[] = [
	{
		label: 'Who We Are',
		href: '#',
		isDropdown: true,
		dropdownContent: {
			type: 'simple',
			items: [
				{
					title: 'About Us',
					href: '/about-us',
					description:
						'Innovative solutions, exceptional value, industry expertise.',
					icon: Info,
				},
				{
					title: 'Team',
					href: '/team',
					description: 'Experienced leaders driving growth and innovation.',
					icon: Users,
				},				
			],
		},
	},
	{
		label: 'Our Pillars',
		href: '#',
		isDropdown: true,
		dropdownContent: {
			type: 'simple',
            items: [
                {
                    title: 'Capital Factory',
                    href: '/capital-factory',
                    description:
                        'Innovative solutions, exceptional value, industry expertise.',
                    icon: Info,
                },
                {
                    title: 'Code Factory',
                    href: '/code-factory',
                    description: 'Experienced leaders driving growth and innovation.',
                    icon: Users,
                },
                {
                    title: 'Digital Factory',
                    href: '/digital-factory',
                    description: 'Great careers, competitive benefits, dynamic team.',
                    icon: Rocket,
                },
                {
                    title: 'Talent Factory',
                    href: '/talent-factory',
                    description: 'Great careers, competitive benefits, dynamic team.',
                    icon: Rocket,
                },
            ],
		},
    },
    {
        label: 'Services',
        href: '/services',
        isDropdown: false,
    },
	{
		label: 'Resources',
		href: '#',
		isDropdown: true,
		dropdownContent: {
			type: 'simple',
			items: [
				{
					title: 'News',
					href: '/insights',
					description: 'Industry insights, expert tips, and company updates.',
					icon: Newspaper,
				},
				{
					title: 'Case Studies',
					href: '/case-studies',
					description: 'Upcoming conferences, workshops, and networking.',
					icon: Calendar,
				},
				{
					title: 'Tools',
					href: '/tools',
					description: 'Real client success stories and proven results.',
					icon: FileText,
				},
			],
		},
	},
]

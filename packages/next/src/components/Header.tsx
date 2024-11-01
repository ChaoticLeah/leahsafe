import { Navigation } from '@/components/Navigation';
import { NavigationUser } from '@/components/NavigationUser';
// import { DiscordLogo } from '@/components/svg/DiscordLogo';
import { GitHubLogo } from '@/components/svg/GitHubLogo';
// import { PatreonLogo } from '@/components/svg/PatreonLogo';
import { MisskeyLogo } from '@/components/svg/MisskeyLogo';
import { UploadProgress } from '@/components/UploadProgress';
import { buttonVariants } from '@/styles/button';
import { ChibisafeLogo } from './svg/ChibisafeLogo';
import request from '@/lib/request';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Header = async () => {
	const { data } = await request.get({
		url: 'settings',
		options: {
			next: {
				tags: ['settings']
			}
		}
	});

	return (
		<header className="container z-40">
			<div className="flex h-16 sm:h-20 place-content-between place-items-center">
				<Navigation logo={<ChibisafeLogo className="w-6 h-6" />} serviceName={data?.serviceName} />
				<UploadProgress />
				<nav className="flex items-center gap-1">
					<a href="https://github.com/ChaoticLeah/leahsafe" target="_blank" rel="noopener noreferrer">
						<div
							className={buttonVariants({
								size: 'icon',
								variant: 'ghost'
							})}
						>
							<GitHubLogo className="h-6 w-6" />
							<span className="sr-only">GitHub</span>
						</div>
					</a>

					<a href="http://fedi.leahdevs.xyz/" target="_blank" rel="noopener noreferrer">
						<div
							className={buttonVariants({
								size: 'icon',
								variant: 'ghost'
							})}
						>
							<MisskeyLogo className="h-6 w-6" />
							<span className="sr-only">GitHub</span>
						</div>
					</a>

					{/* <div className="hidden md:inline-flex ml-4">
						<Link
							href="/login"
							className={cn(
								buttonVariants({ variant: 'secondary', size: 'sm' }),
								'px-4 items-center text-lg font-medium sm:text-sm'
							)}
						>
							Info
						</Link>
					</div> */}
					<div className="hidden md:inline-flex ml-4">
						<NavigationUser />
					</div>
				</nav>
			</div>
		</header>
	);
};

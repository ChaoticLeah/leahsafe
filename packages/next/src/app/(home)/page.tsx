import { UploadTriggerHomepage } from '@/components/UploadTriggerHomepage';
import { ChibisafeLogo } from '@/components/svg/ChibisafeLogo';
import { DiscordLogo } from '@/components/svg/DiscordLogo';
import { GitHubLogo } from '@/components/svg/GitHubLogo';
import { MisskeyLogo } from '@/components/svg/MisskeyLogo';
import { PatreonLogo } from '@/components/svg/PatreonLogo';
import request from '@/lib/request';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/styles/button';
import { BlocksIcon, GalleryHorizontal, LinkIcon, Star, TagsIcon, UsersRoundIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
	let stars = null;

	try {
		const response = await fetch('https://api.github.com/repos/ChaoticLeah/leahsafe', {
			headers: {
				Accept: 'application/vnd.github+json'
			},
			next: {
				revalidate: 60
			}
		});

		const json = await response.json();
		if (json.stargazers_count) {
			stars = Number.parseInt(json.stargazers_count, 10).toLocaleString();
		}
	} catch (error) {
		console.error(error);
	}

	const { data: settings, error } = await request.get({
		url: 'settings',
		options: {
			next: {
				tags: ['settings']
			}
		}
	});

	if (error) {
		console.log(error);
	}

	if (!settings) {
		return (
			<section className="py-2 sm:py-4">
				<div className="container flex min-h-[calc(100vh-15rem)] max-w-[64rem] flex-col text-center place-items-center place-content-evenly gap-4">
					<ChibisafeLogo className="mx-auto mb-4 sm:h-64 sm:w-64 w-32 h-32 rounded-xl" />
					<h1 className="font-heading text-2xl sm:text-5xl">Welcome to chibisafe</h1>
					<p className="max-w-[42rem] text-muted-foreground">
						Couldn't establish a connection to the server. Please try again later.
					</p>
				</div>
			</section>
		);
	}

	if (settings?.useMinimalHomepage) {
		return (
			<section className="py-2 sm:py-4">
				<div className="container flex min-h-[calc(100vh-16rem)] max-w-[64rem] flex-col text-center place-items-center place-content-evenly gap-4">
					<ChibisafeLogo className="mx-auto mb-4 sm:h-64 sm:w-64 w-32 h-32 rounded-xl" />
					<h1 className="font-heading text-2xl sm:text-5xl">
						Welcome to {settings.serviceName ?? 'chibisafe'}
					</h1>
					<div className="subtitle mt-8 lg:mt-16 italic leading-tight text-lg">
						Pretty and performant vault to save all your files.
					</div>
					<UploadTriggerHomepage settings={settings} />
				</div>
			</section>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<section className="py-2 sm:py-4">
				<div className="container flex min-h-[calc(100vh-8rem)] max-w-[64rem] flex-col text-center place-content-center gap-32">
					<div className="flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-0">
						<div className="flex flex-col gap-6 items-center lg:items-start">
							<h1 className="font-heading text-2xl sm:text-5xl text-center lg:text-left">
								Welcome to
								<span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500">
									{' ' + (settings.serviceName ?? 'chibisafe')}
								</span>
							</h1>
							<p className="max-w-full w-full text-muted-foreground text-lg lg:text-xl font-normal text-center lg:text-left  sm:h-28 sm:min-h-28">
								{settings.metaDescription}
							</p>
							<div className="hidden md:flex flex-col md:flex-row gap-4">
								<Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
									Get Started
								</Link>
								<a
									href="https://github.com/ChaoticLeah/leahsafe"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
								>
									{stars ? (
										<>
											{stars}
											<Star className="h-4 w-4 mx-1" />
										</>
									) : null}
									GitHub
								</a>
								<a
									href={'mailto:' + settings.contactEmail}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
								>
									Contact
								</a>
							</div>
						</div>

						<ChibisafeLogo className="mx-auto sm:h-64 sm:min-h-64 sm:w-64 sm:min-w-64 w-32 min-w-32 h-32 min-h-32 rounded-xl" />
					</div>

					<div className="flex flex-col gap-12 place-content-center place-items-center w-full">
						<UploadTriggerHomepage settings={settings} />
						<div className="md:hidden flex flex-col gap-4">
							<Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
								Get Started
							</Link>
							<a
								href="https://github.com/ChaoticLeah/leahsafe"
								target="_blank"
								rel="noopener noreferrer"
								className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
							>
								{stars ? (
									<>
										{stars}
										<Star className="h-4 w-4 mx-1" />
									</>
								) : null}
								GitHub
							</a>
						</div>
					</div>
				</div>
			</section>
			<section id="features" className="container flex flex-col gap-12 py-8 bg-slate-50 dark:bg-transparent">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						leahsafe is easily customizable and deploying your own instance is a breeze.
					</p>
				</div>
				<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<GalleryHorizontal className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Albums / Galleries</h3>
								<p className="text-sm text-muted-foreground">
									Organize your files in albums, make them public and share their links.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<LinkIcon className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Sharing links</h3>
								<p className="text-sm text-muted-foreground">
									Share your files with anyone by creating a shareable link.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<BlocksIcon className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Chunked uploads</h3>
								<p className="text-sm text-muted-foreground">
									Upload files of any size by splitting them into smaller chunks.
								</p>
							</div>
						</div>
					</div>

					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<TagsIcon className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Tags</h3>
								<p className="text-sm text-muted-foreground">
									Tag your files and enjoy a powerful search experience.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M6.942 14.9c.056 0 .11.01.158.03a.179.179 0 1 0 .246.24a.438.438 0 1 1-.404-.27m0 1.185a.749.749 0 1 1 .002-1.497a.749.749 0 0 1-.002 1.497m13.444-4.901c-2.124 5.628-6.92 8.135-12.576 8.135c-2.672 0-4.803-.92-6.167-2.452l.01-.006c.393.02.745.026 1.101.026c.327 0 .646-.003.941-.02l.084-.006s.091-.006.046-.007a8.545 8.545 0 0 0 1.877-.306a4.82 4.82 0 0 0 .286-.09a.197.197 0 0 0-.128-.371c-.69.239-1.6.37-2.715.395a21.668 21.668 0 0 1-1.86-.045a6.3 6.3 0 0 1-.386-.58l-.187-.34C.15 14.411-.096 13.12.034 11.716h16.363c1.344 0 2.656-.502 3.28-1.055c-1.117-.908-1.006-3.064-.295-3.886c.618.496 1.613 1.54 1.442 2.871c.777-.39 2.127-.583 3.176.022c-.659 1.286-2.107 1.67-3.614 1.516m-18.13.135h2.212V9.106H2.255zm2.552 0h2.213V9.106H4.808zm0-2.553h2.213V6.553H4.808zm2.553 2.553h2.213V9.106H7.361zm0-2.553h2.213V6.553H7.361zm2.553 2.553h2.213V9.106H9.914zm0-2.553h2.213V6.553H9.914zm0-2.553h2.213V4H9.914zm2.553 5.106h2.213V9.106h-2.213z"
								/>
							</svg>
							<div className="space-y-2">
								<h3 className="font-bold">Docker</h3>
								<p className="text-sm text-muted-foreground">
									Deploying chibisafe with docker is as easy as running a single command.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background-transparent p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<UsersRoundIcon className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">User management</h3>
								<p className="text-sm text-muted-foreground">
									Manage users, their files and storage quotas from the admin dashboard.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto text-center md:max-w-[58rem]">
					<p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						leahsafe is also built to be extensible and customizable; with a powerful API, a beautiful
						dashboard and a powerful search engine, you have all the tools needed to manage your files.
					</p>
				</div>
			</section>
			<section id="open-source" className="container py-12">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-8 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Proudly Open Source</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						leahsafe is open source. <br /> It is a fork of{' '}
						<a
							href="https://github.com/chibisafe/chibisafe"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4"
						>
							chibisafe
						</a>
						. The code is available on{' '}
						<a
							href="https://github.com/ChaoticLeah/leahsafe"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4"
						>
							GitHub
						</a>
						.
					</p>

					<div>
						<h6 className="text-muted-foreground">Support leahsafe</h6>
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
					</div>

					<div>
						<h6 className="text-muted-foreground">Support chibisafe</h6>
						<a href="https://github.com/chibisafe/chibisafe" target="_blank" rel="noopener noreferrer">
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
						<a href="https://patreon.com/pitu" target="_blank" rel="noopener noreferrer">
							<div
								className={buttonVariants({
									size: 'icon',
									variant: 'ghost'
								})}
							>
								<PatreonLogo className="h-6 w-6" />
								<span className="sr-only">Patreon</span>
							</div>
						</a>
						<a href="https://discord.gg/5g6vgwn" target="_blank" rel="noopener noreferrer">
							<div
								className={buttonVariants({
									size: 'icon',
									variant: 'ghost'
								})}
							>
								<DiscordLogo className="h-6 w-6" />
								<span className="sr-only">Discord</span>
							</div>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}

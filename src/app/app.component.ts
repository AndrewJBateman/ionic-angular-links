import { Component, Inject, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private deepLinks: Deeplinks,
		@Inject(Router) private router: Router,
		private zone: NgZone
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.setupDeepLinks();
		});
	}

	setupDeepLinks() {
		this.deepLinks
			.route({
				'/:slug': 'posts',
				'/products/:id': '',
			})
			.subscribe(
				(match) => {
					console.log('Successfully matched route', match);
					const internalPath = `/${match.$route}/${match.$args['slug']}`;
					this.zone.run(() => {
						this.router.navigateByUrl(internalPath);
					});
				},
				(nomatch) => {
					// nomatch.$link - the full link data
					console.error("Got a deeplink that didn't match", nomatch);
				}
			);
	}
}

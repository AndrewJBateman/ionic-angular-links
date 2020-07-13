import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
	post = null;

	constructor(private http: HttpClient, private route: ActivatedRoute) {}

	ngOnInit() {
		let slug = this.route.snapshot.paramMap.get('slug');
		let url = `https://devdactic.com/wp-json/wp/v2/posts?slug=${slug}&_embed`;

		this.http
			.get<any[]>(url)
			.pipe(
				map((res) => {
					let post = res[0];
					// Quick change to extract the featured image
					post['media_url'] =
						post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes[
							'medium'
						].source_url;
					return post;
				})
			)
			.subscribe((post) => {
				this.post = post;
			});
	}
}

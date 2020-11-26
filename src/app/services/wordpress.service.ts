import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class WordpressService {
	url = `https://yourwordpresspage.com/wp-json/wp/v2/`;
	totalPosts = null;
	pages: any;

	constructor(private http: HttpClient) {}

	getPosts(page = 1): Observable<any[]> {
		let options = {
			observe: 'response' as 'body',
			params: {
				per_page: '5',
				page: '' + page,
			},
		};

		return this.http.get<any[]>(`${this.url}posts?_embed`, options).pipe(
			map((resp) => {
				this.pages = resp['headers'].get('x-wp-totalpages');
				this.totalPosts = resp['headers'].get('x-wp-total');

				let data = resp['body'];

				for (let post of data) {
					post.media_url =
						post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes[
							'medium'
						].source_url;
				}
				return data;
			})
		);
	}

	getPostContent(id) {
		return this.http.get(`${this.url}posts/${id}?_embed`).pipe(
			map((post) => {
				post['media_url'] =
					post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes[
						'medium'
					].source_url;
				return post;
			})
		);
	}
}

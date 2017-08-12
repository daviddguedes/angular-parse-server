import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ParseServiceService {

	SERVER: string = "http://localhost:1337/api/v1";
	DOMAIN: string = "http://localhost:1337";

	constructor(private _http: Http) { }

	getUsers() {
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');
		headers.append('Content-Type', 'application/json');

		return this._http.get(this.SERVER + '/users', { headers: headers })
			.map((res) => res.json());
	}

	createUsers(user) {
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');
		headers.append('X-Parse-Revocable-Session', "1");
		headers.append('Content-Type', 'application/json');

		return this._http.post(this.SERVER + '/users', user, { headers: headers })
			.map((res) => res.json());
	}

	// O Parse não permite que um usuário edite os dados de outro usuário.
	// Para alterar os dados de outro usuário é necessário utilizar a Master Key
	// Portanto criei outra rota no express que resolve essa operação.
	adminAlterarUser(user) {
		let token = JSON.parse(window.localStorage.getItem("currentUser"));
		let headers = new Headers();
		headers.append('X-Parse-Session-Token', token.sessionToken);
		headers.append('Content-Type', 'application/json');

		return this._http.post(this.DOMAIN + '/admin/user', user, { headers: headers })
			.map((res) => res.json());
	}

	// Apenas o próprio usuário tem permissão para editar seus dados.
	alterarUser(user) {
		let token = JSON.parse(window.localStorage.getItem("currentUser"));
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');
		headers.append('X-Parse-Session-Token', token.sessionToken);
		headers.append('Content-Type', 'application/json');

		return this._http.put(this.SERVER + '/users/' + user.objectId, user, { headers: headers })
			.map((res) => res.json());
	}

	apagarUser(user) {
		let token = JSON.parse(window.localStorage.getItem("currentUser"));
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');
		headers.append('X-Parse-Session-Token', token.sessionToken);
		headers.append('Content-Type', 'application/json');

		return this._http.delete(this.SERVER + '/users/' + user.objectId, { headers: headers })
			.map((res) => res.json());
	}

	buscarUser(id) {
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');

		return this._http.get(this.SERVER + '/users/' + id, { headers: headers })
			.map((res) => res.json());
	}

	login(username, password) {
		let headers = new Headers();
		headers.append('X-Parse-Application-Id', 'myAppId');
		headers.append('X-Parse-REST-API-Key', 'myRestApiKey');
		headers.append('X-Parse-Revocable-Session', '1');

		return this._http.get(this.SERVER + '/login?username=' + username + '&password=' + password, { headers: headers })
			.map((res) => res.json());
	}

}

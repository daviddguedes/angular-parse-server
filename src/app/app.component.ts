import { ParseServiceService } from './parse-service.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	us: any = {};
	user: any = {};
	userEdit: any = {};
	users: any = [];
	editUser: boolean = false;
	logado: boolean;
	storage: any;
	currentUser: any;

	constructor(private _pService: ParseServiceService) { 
		this.storage = window.localStorage;
		this.currentUser = JSON.parse(this.storage.getItem('currentUser'));
	}

	ngOnInit() {
		this.listarUsuarios();
		if (this.currentUser) this.logado = true;
	}

	listarUsuarios() {
		this._pService.getUsers()
			.subscribe((users) => {
				this.users = users.results;
			}, (error) => {
				console.log(error);
			})
	}

	novoUsuario(user) {
		this._pService.createUsers(user)
			.subscribe((user) => {
				this.listarUsuarios();
				this.user = {};
			}, error => {
				console.log(error);
			});
	}

	alterarUsuario(user) {
		this._pService.alterarUser(user)
			.subscribe((user) => {
				console.log(user);
				this.editUser = false;
				this.listarUsuarios();
			}, error => {
				console.log(error);
				this.editUser = false;
			});
	}

	editar(id) {
		this._pService.buscarUser(id)
			.subscribe((user) => {
				this.userEdit.objectId = user.objectId;
				this.userEdit.username = user.username;
				this.userEdit.telefone = user.telefone;
				this.editUser = true;
			}, error => {
				console.log(error);
				this.editUser = false;
			});
	}

	apagar(id) {
		this._pService.buscarUser(id)
			.subscribe((user) => {
				this._pService.apagarUser(user)
					.subscribe((user) => {
						this.listarUsuarios();
						this.doLogout();
					}, error => {
						console.log(error);
					});
			}, error => {
				console.log(error);
			});
	}

	doLogin(user) {
		this._pService.login(user.username, user.password)
			.subscribe((user) => {
				this.storage.setItem("currentUser", JSON.stringify(user));
				this.currentUser = user;
				this.logado = true;
				this.us = {};
			}, error => {
				console.log(error);
				alert(error.text());
			});
	}

	doLogout() {
		this.storage.removeItem("currentUser");
		this.currentUser = null;
		this.logado = false;
	}

}

import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

const serviceAccountKey = require(`../../environments/${process.env.NODE_ENV}/firebaseKey.json`);

firebase.initializeApp({
  credential: firebase.credential.cert( serviceAccountKey ),
  databaseURL: `https://${serviceAccountKey.project_id}.firebaseio.com`
});

@Injectable()
export class FirebaseService {
  db = firebase.database()
  users = this.db.ref('users');
  posts = this.db.ref('posts');
}

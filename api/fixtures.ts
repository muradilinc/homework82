import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artists';
import Albums from './models/Albums';
import Track from './models/Tracks';
import User from './models/User';
import crypto from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['artists', 'albums', 'tracks', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  await User.create({
    email: 'admin@admin.com',
    password: 'admin',
    token: crypto.randomUUID(),
    role: 'admin',
  });

  const [user, user1] = await User.create(
    {
      email: 'vito@mafia.com',
      password: 'joe',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      email: 'muradil@muradil.com',
      password: 'muradil',
      token: crypto.randomUUID(),
      role: 'user',
    },
  );

  const [lilPeep, miyagiAndAndyPanda, matrang, xxxTentancion, limba] =
    await Artist.create(
      {
        name: 'Lil Peep',
        picture: 'fixtures/artists/lilpeep.jpg',
        description: 'Lil Peep desc',
        user: user,
        isPublished: true,
      },
      {
        name: 'Miyagi and Andy Panda',
        picture: 'fixtures/artists/miyagiandandypanda.jpeg',
        description: 'Miyagi & Panda',
        user: user1,
        isPublished: true,
      },
      {
        name: 'Matrang',
        picture: 'fixtures/artists/matrang.jpeg',
        description: 'Matrang',
        user: user1,
        isPublished: true,
      },
      {
        name: 'XXXTENTACION',
        picture: 'fixtures/artists/xxxtentacion.jpeg',
        description: 'XXXtentacion desc',
        user: user1,
        isPublished: true,
      },
      {
        name: 'The Limba',
        picture: 'fixtures/artists/Limba.jpeg',
        description: 'The Limba desc',
        user: user1,
        isPublished: false,
      },
    );

  const [
    diamonds,
    crybaby,
    yamakasi,
    hajime,
    eya,
    three,
    quest,
    seventeen,
    iathome,
  ] = await Albums.create(
    {
      title: 'Diamonds',
      author: lilPeep,
      release: 2023,
      image: 'fixtures/albums/diamonds.webp',
      user: user,
      isPublished: true,
    },
    {
      title: 'Cry Baby',
      author: lilPeep,
      release: 2016,
      image: 'fixtures/albums/crybaby.jpg',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Yamakasi',
      author: miyagiAndAndyPanda,
      release: 2020,
      image: 'fixtures/albums/Yamakasi.jpeg',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Hajime, Pt. 3',
      author: miyagiAndAndyPanda,
      release: 2018,
      image: 'fixtures/albums/Hajime3.jpg',
      user: user1,
      isPublished: true,
    },
    {
      title: 'ЭЙА',
      author: matrang,
      release: 2018,
      image: 'fixtures/albums/EYA.jpg',
      user: user,
      isPublished: true,
    },
    {
      title: 'ТРИ',
      author: matrang,
      release: 2020,
      image: 'fixtures/albums/three.jpg',
      user: user1,
      isPublished: true,
    },
    {
      title: '?',
      author: xxxTentancion,
      release: 2018,
      image: 'fixtures/albums/quest.jpg',
      user: user1,
      isPublished: true,
    },
    {
      title: '17',
      author: xxxTentancion,
      release: 2017,
      image: 'fixtures/albums/seventeen.png',
      user: user,
      isPublished: true,
    },
    {
      title: 'Я дома',
      author: limba,
      release: 2019,
      image: 'fixtures/albums/iathome.jpg',
      user: user1,
      isPublished: false,
    },
  );

  await Track.create(
    {
      title: "Smokin'",
      number: 1,
      album: diamonds,
      duration: '4:14',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Favorite Drug',
      number: 4,
      album: diamonds,
      duration: '3:55',
      user: user,
      isPublished: true,
    },
    {
      title: 'Prove My Love',
      number: 3,
      album: diamonds,
      duration: '4:29',
      user: user1,
      isPublished: true,
    },
    {
      title: 'November',
      number: 2,
      album: diamonds,
      duration: '2:35',
      user: user,
      isPublished: true,
    },
    {
      title: 'I Sell Cocaine',
      number: 5,
      album: diamonds,
      duration: '4:09',
      user: user1,
      isPublished: true,
    },
    {
      title: 'crybaby',
      number: 1,
      album: crybaby,
      duration: '4:07',
      user: user,
      isPublished: true,
    },
    {
      title: 'yesterday',
      number: 2,
      album: crybaby,
      duration: '1:52',
      user: user1,
      isPublished: true,
    },
    {
      title: 'ghost girl',
      number: 3,
      album: crybaby,
      duration: '2:53',
      user: user,
      isPublished: true,
    },
    {
      title: 'nineteen',
      number: 4,
      album: crybaby,
      duration: '2:57',
      user: user1,
      isPublished: true,
    },
    {
      title: 'white tee',
      number: 5,
      album: crybaby,
      duration: '2:12',
      user: user,
      isPublished: true,
    },
    {
      title: 'Utopia',
      number: 5,
      album: yamakasi,
      duration: '3:29',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Мало нам',
      number: 2,
      album: yamakasi,
      duration: '3:48',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Minor',
      number: 3,
      album: yamakasi,
      duration: '2:55',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Там ревели горы',
      number: 4,
      album: yamakasi,
      duration: '2:56',
      user: user,
      isPublished: true,
    },
    {
      title: 'Yamakasi',
      number: 1,
      album: yamakasi,
      duration: '4:29',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Колизей',
      number: 1,
      album: hajime,
      duration: '4:27',
      user: user,
      isPublished: true,
    },
    {
      title: 'Дама',
      number: 2,
      album: hajime,
      duration: '3:34',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Я хочу любить',
      number: 3,
      album: hajime,
      duration: '3:48',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Фея',
      number: 4,
      album: hajime,
      duration: '3:45',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Fire Man',
      number: 5,
      album: hajime,
      duration: '3:37',
      user: user,
      isPublished: true,
    },
    {
      title: 'Медуза',
      number: 1,
      album: eya,
      duration: '2:43',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Вода',
      number: 2,
      album: eya,
      duration: '2:56',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Зима',
      number: 3,
      album: eya,
      duration: '1:49',
      user: user,
      isPublished: true,
    },
    {
      title: 'ОМО',
      number: 5,
      album: eya,
      duration: '3:30',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Акула',
      number: 4,
      album: eya,
      duration: '2:15',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Крейсер',
      number: 1,
      album: three,
      duration: '2:34',
      user: user,
      isPublished: true,
    },
    {
      title: 'Драма',
      number: 2,
      album: three,
      duration: '2:33',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Мой сон',
      number: 3,
      album: three,
      duration: '2:44',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Не вздумай',
      number: 4,
      album: three,
      duration: '2:29',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Одна',
      number: 5,
      album: three,
      duration: '2:22',
      user: user,
      isPublished: true,
    },
    {
      title: 'Moonlight',
      number: 1,
      album: quest,
      duration: '2:15',
      user: user1,
      isPublished: true,
    },
    {
      title: 'SAD!',
      number: 2,
      album: quest,
      duration: '2:46',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Changes',
      number: 3,
      album: quest,
      duration: '2:01',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Hope',
      number: 4,
      album: quest,
      duration: '1:50',
      user: user1,
      isPublished: true,
    },
    {
      title: 'schizophrenia',
      number: 5,
      album: quest,
      duration: '1:20',
      user: user,
      isPublished: true,
    },
    {
      title: 'Jocelyn Flores',
      number: 1,
      album: seventeen,
      duration: '1:59',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Revenge',
      number: 2,
      album: seventeen,
      duration: '2:00',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Fuck Love',
      number: 3,
      album: seventeen,
      duration: '2:26',
      user: user,
      isPublished: true,
    },
    {
      title: 'Everybody Dies Their Nightmares',
      number: 4,
      album: seventeen,
      duration: '1:35',
      user: user1,
      isPublished: true,
    },
    {
      title: 'Depression & Obsession',
      number: 5,
      album: seventeen,
      duration: '2:24',
      user: user1,
      isPublished: true,
    },
    {
      title: 'ПАПА',
      number: 3,
      album: iathome,
      duration: '2:21',
      user: user,
      isPublished: false,
    },
    {
      title: 'СКАНДАЛ',
      number: 1,
      album: iathome,
      duration: '2:03',
      user: user1,
      isPublished: false,
    },
    {
      title: 'СИНИЕ ФИАЛКИ',
      number: 2,
      album: iathome,
      duration: '3:13',
      user: user1,
      isPublished: false,
    },
    {
      title: 'ИНТЕРЕС',
      number: 4,
      album: iathome,
      duration: '2:59',
      user: user1,
      isPublished: false,
    },
    {
      title: 'СМУЗИ',
      number: 5,
      album: iathome,
      duration: '2:35',
      user: user1,
      isPublished: false,
    },
  );

  await db.close();
};

void run();

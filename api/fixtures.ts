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

  const [lilPeep, miyagiAndAndyPanda, matrang, xxxTentancion] =
    await Artist.create(
      {
        name: 'Lil Peep',
        picture: 'fixtures/artists/lilpeep.jpg',
        description: 'Lil Peep desc',
      },
      {
        name: 'Miyagi and Andy Panda',
        picture: 'fixtures/artists/miyagiandandypanda.jpeg',
        description: 'Miyagi & Panda',
      },
      {
        name: 'Matrang',
        picture: 'fixtures/artists/matrang.jpeg',
        description: 'Matrang',
      },
      {
        name: 'XXXTENTACION',
        picture: 'fixtures/artists/xxxtentacion.jpeg',
        description: 'XXXtentacion desc',
      },
    );

  const [diamonds, crybaby, yamakasi, hajime, eya, three, quest, seventeen] =
    await Albums.create(
      {
        title: 'Diamonds',
        author: lilPeep,
        release: 2023,
        image: 'fixtures/albums/diamonds.webp',
      },
      {
        title: 'Cry Baby',
        author: lilPeep,
        release: 2016,
        image: 'fixtures/albums/crybaby.jpg',
      },
      {
        title: 'Yamakasi',
        author: miyagiAndAndyPanda,
        release: 2020,
        image: 'fixtures/albums/Yamakasi.jpeg',
      },
      {
        title: 'Hajime, Pt. 3',
        author: miyagiAndAndyPanda,
        release: 2018,
        image: 'fixtures/albums/Hajime3.jpg',
      },
      {
        title: 'ЭЙА',
        author: matrang,
        release: 2018,
        image: 'fixtures/albums/EYA.jpg',
      },
      {
        title: 'ТРИ',
        author: matrang,
        release: 2020,
        image: 'fixtures/albums/three.jpg',
      },
      {
        title: '?',
        author: xxxTentancion,
        release: 2018,
        image: 'fixtures/albums/quest.jpg',
      },
      {
        title: '17',
        author: xxxTentancion,
        release: 2017,
        image: 'fixtures/albums/seventeen.png',
      },
    );

  await Track.create(
    {
      title: "Smokin'",
      number: 1,
      album: diamonds,
      duration: '4:14',
    },
    {
      title: 'Favorite Drug',
      number: 4,
      album: diamonds,
      duration: '3:55',
    },
    {
      title: 'Prove My Love',
      number: 3,
      album: diamonds,
      duration: '4:29',
    },
    {
      title: 'November',
      number: 2,
      album: diamonds,
      duration: '2:35',
    },
    {
      title: 'I Sell Cocaine',
      number: 5,
      album: diamonds,
      duration: '4:09',
    },
    {
      title: 'crybaby',
      number: 1,
      album: crybaby,
      duration: '4:07',
    },
    {
      title: 'yesterday',
      number: 2,
      album: crybaby,
      duration: '1:52',
    },
    {
      title: 'ghost girl',
      number: 3,
      album: crybaby,
      duration: '2:53',
    },
    {
      title: 'nineteen',
      number: 4,
      album: crybaby,
      duration: '2:57',
    },
    {
      title: 'white tee',
      number: 5,
      album: crybaby,
      duration: '2:12',
    },
    {
      title: 'Utopia',
      number: 5,
      album: yamakasi,
      duration: '3:29',
    },
    {
      title: 'Мало нам',
      number: 2,
      album: yamakasi,
      duration: '3:48',
    },
    {
      title: 'Minor',
      number: 3,
      album: yamakasi,
      duration: '2:55',
    },
    {
      title: 'Там ревели горы',
      number: 4,
      album: yamakasi,
      duration: '2:56',
    },
    {
      title: 'Yamakasi',
      number: 1,
      album: yamakasi,
      duration: '4:29',
    },
    {
      title: 'Колизей',
      number: 1,
      album: hajime,
      duration: '4:27',
    },
    {
      title: 'Дама',
      number: 2,
      album: hajime,
      duration: '3:34',
    },
    {
      title: 'Я хочу любить',
      number: 3,
      album: hajime,
      duration: '3:48',
    },
    {
      title: 'Фея',
      number: 4,
      album: hajime,
      duration: '3:45',
    },
    {
      title: 'Fire Man',
      number: 5,
      album: hajime,
      duration: '3:37',
    },
    {
      title: 'Медуза',
      number: 1,
      album: eya,
      duration: '2:43',
    },
    {
      title: 'Вода',
      number: 2,
      album: eya,
      duration: '2:56',
    },
    {
      title: 'Зима',
      number: 3,
      album: eya,
      duration: '1:49',
    },
    {
      title: 'ОМО',
      number: 5,
      album: eya,
      duration: '3:30',
    },
    {
      title: 'Акула',
      number: 4,
      album: eya,
      duration: '2:15',
    },
    {
      title: 'Крейсер',
      number: 1,
      album: three,
      duration: '2:34',
    },
    {
      title: 'Драма',
      number: 2,
      album: three,
      duration: '2:33',
    },
    {
      title: 'Мой сон',
      number: 3,
      album: three,
      duration: '2:44',
    },
    {
      title: 'Не вздумай',
      number: 4,
      album: three,
      duration: '2:29',
    },
    {
      title: 'Одна',
      number: 5,
      album: three,
      duration: '2:22',
    },
    {
      title: 'Moonlight',
      number: 1,
      album: quest,
      duration: '2:15',
    },
    {
      title: 'SAD!',
      number: 2,
      album: quest,
      duration: '2:46',
    },
    {
      title: 'Changes',
      number: 3,
      album: quest,
      duration: '2:01',
    },
    {
      title: 'Hope',
      number: 4,
      album: quest,
      duration: '1:50',
    },
    {
      title: 'schizophrenia',
      number: 5,
      album: quest,
      duration: '1:20',
    },
    {
      title: 'Jocelyn Flores',
      number: 1,
      album: seventeen,
      duration: '1:59',
    },
    {
      title: 'Revenge',
      number: 2,
      album: seventeen,
      duration: '2:00',
    },
    {
      title: 'Fuck Love',
      number: 3,
      album: seventeen,
      duration: '2:26',
    },
    {
      title: 'Everybody Dies Their Nightmares',
      number: 4,
      album: seventeen,
      duration: '1:35',
    },
    {
      title: 'Depression & Obsession',
      number: 5,
      album: seventeen,
      duration: '2:24',
    },
  );

  await User.create({
    username: 'muradil',
    password: 'satoru',
    token: crypto.randomUUID(),
  });

  await db.close();
};

void run();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Dog, Owner, Story, Person } = require('./model/Dog');

app.use(express.json());

app.get('/', async (req, res) => {
	try {
		const dogs = await Dog.find({}).populate({ path: 'owner', model: 'Owner' });
		// const owners = await Owner.find();
		res.send(dogs);
	} catch (error) {
		res.send(error);
	}
});

app.post('/', async (req, res) => {
	const post = new Dog({
		dogname: req.body.dogname,
	});

	const owner = new Owner({
		name: req.body.name,
	});

	try {
		const savedDog = await post.save();
		const savedOwner = await owner.save();
		res.send({ savedOwner, savedDog });
	} catch (error) {
		res.send(error);
	}
});

app.get('/seed', async (req, res) => {
	dogs = [{ dogname: 'Rover' }, { dogname: 'Sport' }, { dogname: 'Biff' }];
	owners = [{ name: 'John' }, { name: 'Stacy' }, { name: 'Jossy' }];

	try {
		const newDogs = await Dog.create(dogs);
		const newOwners = await Owner.create(owners);

		res.send({ newDogs, newOwners });
	} catch (error) {
		res.send(error);
	}
});

//Give dog an owner

app.get('/adopt/:dog/:owner', async (req, res) => {
	const ownerId = mongoose.Types.ObjectId(req.params.owner);
	console.log(ownerId);
	const dog = await Dog.findById(req.params.dog);
	console.log(dog);
	dog.owner = ownerId;
	dog.save();
	res.send(dog);
});

//Docs

app.get('/docs', (req, res) => {
	Story.findOne({ title: 'Donnie Brasco' })
		.populate('author')
		.exec(function (err, story) {
			// console.log(story.populated('author'));
			res.send(story);
			if (err) return handleError(err);
			console.log('The author is %s', story.author.name);
			// prints "The author is Ian Fleming"
		});
});

app.get('/docSave', (req, res) => {
	const author = new Person({
		_id: new mongoose.Types.ObjectId(),
		name: 'Pistone',
		age: 60,
	});

	const story1 = new Story({
		title: 'Donnie Brasco',
		author: author._id, // assign the _id from the person
	});

	author.save(function (err) {
		if (err) return handleError(err);
	});

	story1.save(function (err) {
		if (err) return handleError(err);
		// that's it!
	});
	res.send('done');
});

mongoose
	.connect(
		'mongodb+srv://huzaifah:infinix510@cluster0.9jxol.mongodb.net/test?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true },
		console.log('Db connected')
	)
	.then((res) => {
		// console.log(res, 'then output');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(3000, () => {
	console.log('Server is running');
});

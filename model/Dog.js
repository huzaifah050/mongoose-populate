const mongoose = require('mongoose');
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
	name: String,
	nicky: String,
	surname: {
		type: Number,
	},
	dog: { type: mongoose.Types.ObjectId, ref: 'Dog' },
});

const dogSchema = new Schema({
	dogname: String,
	owner: { type: mongoose.Types.ObjectId, ref: 'Owner' },
});

const Dog = mongoose.model('Dog', dogSchema);
const Owner = mongoose.model('Owner', ownerSchema);

//Docs

const personSchema = Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	age: Number,
	// stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
	author: { type: Schema.Types.ObjectId, ref: 'Person' },
	title: String,
	// fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

module.exports = { Dog, Owner, Story, Person };

// module.exports = mongoose.model('Dog', dogSchema);

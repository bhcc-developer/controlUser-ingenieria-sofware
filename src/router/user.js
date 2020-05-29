const router = require('express').Router()
const User = require('../Models/use')
const jwt = require('jsonwebtoken');

router.get('/user', async (req, res) => {
    const user = await  User.find()
    res.json(user);
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await User.findOne({email})
    if(user) return res.status(401).json({message: 'Ya Existe un el correo electronico'});
    const newUser = new User({email, password});
    await newUser.save();
	const token = jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

	const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token, user});
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router
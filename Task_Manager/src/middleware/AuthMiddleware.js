import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	// Receive Token
	let token = req.headers['token'];
	// JWT Token Verify by decoding it
	jwt.verify(token, '123-xyz', function (err, success) {
		// Request Header Email+UserID Add
		if (err) {
			res.status(401).json({ status: unauthorized });
		} else {
			let email = success['data'];
			req.headers.email = email;
			next();
		}
	});
};

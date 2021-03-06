import express from 'express'
import User from '../../models/user.js'


const router = express.Router();

// Get information about all users
router.get('/', async (req, res) => {
    let user = await User.find().select('-password');
    res.status(200).json({
        data: user,
        message: 'success',
        code: 200
    });
});

// Obtain user information based on token
router.get('/token', async (req, res) => {
    let id = req.user.user._id;
    let user = await User.findById(id).populate('friends');
    return res.status(200).json({
        data: user,
        message: 'success',
        code: 200
    });
});

// Obtain user information based on email
router.get('/:email', async (req, res) => {
    let email = req.params.email;
    if (email) {
        let user = await User.findOne({
            email: email
        }).select('-password');
        if (user) {
            return res.status(200).json({
                data: user,
                message: 'success',
                code: 200
            });
        }
    }
    res.status(404).json({
        data: null,
        message: 'User does not exist, please register first',
        code: 404
    });
});

// Update user details
router.put('/userinfo', async (req, res) => {
    let {
        user: {
            _id
        }
    } = req.user;
    if (_id) {
        let user = await User.findByIdAndUpdate(_id, req.body);
        if (user) {
            return res.status(200).json({
                data: user,
                message: 'success',
                code: 200
            });
        }
    }
    res.status(404).json({
        data: null,
        message: 'Please try again later',
        code: 404
    });
});

// Delete the specified user
router.delete('/:email', async (req, res) => {
    let user = await User.deleteOne({
        email: req.params.email
    });
    if (user) {
        return res.status(200).json({
            data: null,
            message: 'success',
            code: 200
        });
    }
    res.status(404).json({
        data: null,
        message: 'User does not exist, please register first',
        code: 404
    });
});

export default router

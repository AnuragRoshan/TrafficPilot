const bcrypt = require('bcryptjs');
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const questionSchema = require('../Models/questionSchema');
const Question = require('../Models/questionSchema');
const UserAnswer = require('../Models/userAnswerSchema');

// const {
//     checkUserExists,
//     checkEmailValidity,
//     checkAgeValidity,
// } = require('../Middleware/userReg');

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passCheck = await bcrypt.compare(password, user.password)

        if (user && passCheck) {
            const token = jwt.sign(
                { id: user.id, username: user.username, name: user.name },
                "jwtsecret",
                { expiresIn: "1h" },
            )
            user.token = token;
            user.password = undefined;

            //cookie section
            const options = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
                ),
                httpOnly: true,
            };
            res.status(200).cookie("jwt", token, options).json({ msg: 'User Logged In Successfully', token, user });
        } else {
            res.status(201).json({ msg: "Invalid Creds" })
        }

    } catch (error) {
        console.log(error);
    }
};

exports.getUser = async (req, res, next) => {
    // console.log(req.user);
    let user
    if (req.user) {
        // console.log(req.user);
        user = await User.findOne({ username: req.user.username });
    }
    res.send(user);

};

exports.logout = async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({ msg: "User Logged Out" });
};




exports.updateDb = async (req, res, next) => {

};



exports.registerUser = async (req, res, next) => {
    // return res.send("User Registered");
    // console.log(req.body);
    const { name, username, password, mobileNumber, address } = req.body;
    const pan = "EJEPR1089B";
    const profileImage = "https://www.google.com/search?q=profile+image&rlz=1C1GCEU_enIN832IN832&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiVt5zQ5fzxAhWYzDgGHcYzBZQQ_AUICCgB&biw=1366&bih=657#imgrc=7N1hWvNc8fZyqM";
    try {

        // console.log(req.body);
        const user = await User.findOne({ username });
        if (user) {
            return res.status(201).json({ msg: "User Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name, username, password: hashedPassword, mobileNumber, address, pan, profileImage
        });
        await newUser.save();
        res.status(200).json({ msg: "User Registered Successfully" });
    }

    catch (error) {
        console.log(error);
    }
};

exports.getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.log(error);
    }
};


exports.startAssessment = async (req, res, next) => {

    const { userId } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set the start timestamp to the current date and time
        user.startTimestamp = new Date();

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Start timestamp set successfully' });
    } catch (error) {
        console.error('Error setting start timestamp:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.toggleAnswer = async (req, res, next) => {
    const { userId, questionId, answer } = req.body;

    try {
        // Check if the user has already answered the question
        let userAnswer = await UserAnswer.findOne({ user: userId, question: questionId });

        // If user answer exists, update it; otherwise, create a new user answer
        if (userAnswer) {
            userAnswer.answer = answer;
            await userAnswer.save();
        } else {
            userAnswer = new UserAnswer({ user: userId, question: questionId, answer });
            await userAnswer.save();
        }

        return res.status(200).json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error('Error submitting answer:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
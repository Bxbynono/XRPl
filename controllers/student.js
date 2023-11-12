const Student = require('./../models/student')


exports.getAllStudents = async (req, res) => {
    try {
        const student = await Student.find()
        res.status(200).json({ data: student, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.json({ data: student, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json({ data: student, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body);
        console.log(req.body)
        res.json({ data: student, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        res.json({ data: student, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
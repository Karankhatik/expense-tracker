const Expense = require("../models/expense");

//expense create from comes here and create the expense
module.exports.create = async function (req, res) {
  try {
    //create the object
    const newExpense = await Expense.create(req.body.data);

    //sending the response
    return res
      .status(200)
      .json({ success: true, message: "Expense created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//show details api req to this controller
module.exports.showdata = async function (req, res) {
  const userId = req.params.id;
  try {
    //getting the expenses of the particular person from the database
    const expenses = await Expense.find({ userId: userId });
    //sending the respons to the data base
    return res.json({
      success: true,
      message: "User created successfully",
      expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//deleting the expense data from the data base
module.exports.destroy = async function (req, res) {
  try {
    const expense = await Expense.findById(req.params.id);
    //.id means coverting the object id into string
    await expense.deleteOne();
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

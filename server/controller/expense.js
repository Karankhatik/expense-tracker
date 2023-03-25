const Expense = require('../models/expense')

module.exports.create = async function(req, res){ 
   
    try {         
          const newExpense = await Expense.create(
            req.body.data
          );
          console.log(newExpense);
          return res.status(200).json({ success: true, message: "Expense created successfully" });
        
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
}


module.exports.showdata = async function(req, res){
  const userId = req.params.id;  
  try {
    //console.log(userId);
    const expenses = await Expense.find({ userId: userId });
    console.log(expenses);

    const totalAmount = expenses.reduce((sum, e) => sum + e.totalAmount, 0);






    return res.json({ success: true, message: "User created successfully",expenses});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports.destroy = async function (req, res) {
  try {
    const expense = await Expense.findById(req.params.id);
    //.id means coverting the object id into string
      await expense.deleteOne();
      return res.status(200).json({ message: 'Expense deleted successfully' });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



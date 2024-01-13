
import { hashData, compareData } from "../utils.js";
import {Router} from "express"
import passport from "passport"
import "../passport.js"
import { generateToken } from "../utils.js"
import ResponseDto from "../DAL/dtos/response.dto.js";


const router = Router();


router.post('/signup', passport.authenticate('signup'),(req, res) => {
    res.json({message: 'Signed up'})    
})




router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res) => {
  const userDTO = new ResponseDto(req.user);
  res.status(200).json({message: 'User logged', user: userDTO})  
})


router.get('/signout', async(req, res)=>{
  req.session.destroy(()=> {       
      res.redirect('/login')
  })
})



router.post('/login', passport.authenticate('login', { failureMessage:true,
  failureRedirect: "/error",}),(req, res) => {

    const {name, email, age, role, carts} = req.user    
   
    const token = generateToken({ name, email, age, role, carts})

    res.cookie('token', token, { maxAge: 60000, httpOnly: true })
    return res.redirect('/api/sessions/current')
}) 

router.post("/restaurar", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
})
export default router




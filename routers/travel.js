const express =require("express")
const travel = require("../models/travel")
const router =express.Router()
const Travel = require("../models/travel")

router.get("/new",(req,res)=>{
    res.render("travel/new",{travel:new Travel()})
})
router.get("/edit/:id",async(req,res)=>{
    const travel =await Travel.findById(req.params.id)
    res.render("travel/edit",{travel:travel})
})


router.get('/:slug',async(req,res)=>{
    const travel =await Travel.findOne({slug:req.params.slug})
    if(travel == null)res.redirect("/")
    res.render("travel/show",{travel:travel})
})

router.post("/",async(req,res,next)=>{
    req.travel =new Travel()
    next()
},saveTravelAndRedirect("new"))

router.put("/:id",async(req,res,next)=>{
    req.travel =await Travel.findById(req.params.id)
    next()
},saveTravelAndRedirect("edit"))


router.delete("/:id",async(req,res)=>{
    await Travel.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

function saveTravelAndRedirect(path){
    return async(req,res)=>{
        let travel =req.travel
            travel.title=req.body.title
            travel.descrition=req.body.descrition
            travel.lat=req.body.lat
            travel.lng=req.body.lng

        try{
        travel =await travel.save()
            res.redirect(`/travel/${travel.slug}`)
    }catch (e){
        console.log(e)
        res.render(`travel/${path}`,{travel:travel})
        }
    
    }
}

module.exports=router

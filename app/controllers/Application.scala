package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action { request =>
    implicit val req = request
    System.err.println("body class is: "+req.body.getClass())
    val inner = views.html.index()
    Ok(views.html.main("title", List("index.css"))(inner))
  }

   def meth(str: String)(str2: String)(implicit req: play.api.mvc.Request[_]) = {
     1
   }

}
package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def withDims(cols: Int, rows: Int) = {
     index(Some(cols, rows))
  }

  def default() = { index(None) }

  def index(dims: Option[(Int, Int)]) = Action { request =>
    implicit val req = request
    System.err.println("body class is: "+req.body.getClass())
    val inner = views.html.index(dims)
    Ok(views.html.main("title", List("index.css"))(inner))
  }

   def meth(str: String)(str2: String)(implicit req: play.api.mvc.Request[_]) = {
     1
   }

}
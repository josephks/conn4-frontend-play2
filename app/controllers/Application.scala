package controllers

import play.api._
import play.api.mvc._
import play.twirl.api.Html

object Application extends Controller {

  def withDims(cols: Int, rows: Int) = {
     index(views.html.predef(cols, rows))
  }

  def default() = { index(views.html.dim_form()) }

  def index(dim_part: Html) = Action { request =>
    implicit val req = request
    System.err.println("body class is: "+req.body.getClass())
    val inner = views.html.index(dim_part)
    Ok(views.html.main("title", List("index.css"))(inner))
  }

   def meth(str: String)(str2: String)(implicit req: play.api.mvc.Request[_]) = {
     1
   }

}
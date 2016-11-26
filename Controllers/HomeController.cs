using SafetyStream.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SafetyStream.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

       [HttpGet]
       //Only allows HTTPGet requests

       //User Id used to query user information
       public JsonResult GetUser(string UserId)
       {
           //SQL Connection String
           SqlConnection SqlConnection = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
           SqlCommand SqlCommand = new SqlCommand();
        
           //Select all user information based on Id
           SqlCommand.CommandText = "SELECT * FROM Users WHERE Id = '" + UserId + "'";
           SqlCommand.CommandType = CommandType.Text;
           SqlCommand.Connection = SqlConnection;

           SqlConnection.Open();

           var User = new User();

           SqlDataReader SqlDataReader = SqlCommand.ExecuteReader();

           while (SqlDataReader.Read())
           {
                //Create new user object
                User = new User
                {
                    FirstName = SqlDataReader[1].ToString(),
                    LastName = SqlDataReader[2].ToString(),
                    Age = SqlDataReader[4].ToString(),
                    Phone = SqlDataReader[9].ToString()

                };
            }
          
            SqlConnection.Close();

            //Allow request to accept JSON return 
            return Json(User, JsonRequestBehavior.AllowGet);
       }
    }
}

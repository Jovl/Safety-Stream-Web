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
       public JsonResult GetUser(string Id)
       {
           SqlConnection sqlConnection1 = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
           SqlCommand cmd = new SqlCommand();
           SqlDataReader reader;

           cmd.CommandText = "SELECT * FROM Users WHERE Id = '" + Id + "'";
           cmd.CommandType = CommandType.Text;
           cmd.Connection = sqlConnection1;

           sqlConnection1.Open();

           string fName = null;
           string lName = null;
           string uAge = null;
           string phoneNumnber = null;

           reader = cmd.ExecuteReader();

           while (reader.Read())
           {

               fName = reader[1].ToString();
               lName = reader[2].ToString();
               uAge = reader[4].ToString();
               phoneNumnber = reader[9].ToString();
            }
          
           sqlConnection1.Close();

            var user = new User
            {
                FirstName = fName, LastName = lName, Age = uAge, Phone = phoneNumnber
                
            };
            return Json(user, JsonRequestBehavior.AllowGet);
       }
    }
}

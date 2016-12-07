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
        public JsonResult GetUser(string UserId)
        {
            using (SqlConnection connection = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            {
                connection.Open();
                System.Diagnostics.Debug.WriteLine("ServerVersion: {0}", connection.ServerVersion);
                System.Diagnostics.Debug.WriteLine("State: {0}", connection.State);
            }
            // SQL Connection Values
            SqlConnection sqlConnection1 = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;

            // SQL Query
            cmd.CommandText = "SELECT * FROM Users WHERE imei = '" + UserId + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = sqlConnection1;

            // Open Connection
            sqlConnection1.Open();

            var User = new User();
      
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                //Create new user object
                User = new User
                {
                    FirstName = reader[1].ToString(),
                    LastName = reader[2].ToString(),
                    Age = reader[4].ToString(),
                    Phone = reader[9].ToString()
                };
            }
            // Close connection to SQL database
            sqlConnection1.Close();

            //Return JSON object 

            return Json(User, JsonRequestBehavior.AllowGet);
        }
    }
}
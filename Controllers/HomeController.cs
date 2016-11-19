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

       /* [HttpPost]
        public ActionResult GetUser(string id)
        {

            using (SqlConnection connection = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            {
                connection.Open();
                System.Diagnostics.Debug.WriteLine("ServerVersion: {0}", connection.ServerVersion);
                System.Diagnostics.Debug.WriteLine("State: {0}", connection.State);
            }
            // Mandatory connection values
            SqlConnection sqlConnection1 = new SqlConnection("Server=tcp:safetystream.database.windows.net,1433;Database=SafetyStream;Persist Security Info=False;User ID=michaelcain;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;

            // Setup first name grab
            cmd.CommandText = "SELECT * FROM Users WHERE Id = '" + id + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = sqlConnection1;

            // Open Connection
            sqlConnection1.Open();

            String fName = null;

            // Grab first name
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                fName = reader[1].ToString();


            }
            User usr = new User
            {
                FirstName = fName
            };


            sqlConnection1.Close();

            return View();
        }*/


    }



}

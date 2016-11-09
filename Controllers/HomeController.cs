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
            cmd.CommandText = "SELECT FirstName FROM Users WHERE Id = '2'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = sqlConnection1;

            // Open Connection
            sqlConnection1.Open();

            // Grab first name
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                String fName = reader[0].ToString();
                ViewBag.personName = fName;
                System.Diagnostics.Debug.Write("Here is the data contained: " + fName);

            }
            

            // Grab last name
            //cmd.CommandText = "SELECT lastName FROM Users WHERE id = " + idNumber;
            //reader = cmd.ExecuteReader(); // This might just be able to be deleted
            //String lName = reader.ToString();
            //Console.WriteLine(lName);

            // Grab --
            //cmd.CommandText = "SELECT -- FROM Users WHERE id = " + idNumber;
            //reader = cmd.ExecuteReader(); // This might just be able to be deleted
            //String-- = reader.ToString();

            // Close connection to SQL database
            sqlConnection1.Close();
            /*using (var ctx = new UserContext())
            {
                User newUser = new User() { FirstName = "New User" };
                Console.WriteLine("Did it work?");
                ctx.User.Add(newUser);
                ctx.SaveChanges();
            }*/

            return View();
        }
    }
}
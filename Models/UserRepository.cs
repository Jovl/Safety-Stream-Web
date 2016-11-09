using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SafetyStream.Models
{
    public class UserRepository
    {
        public List<User> getUsers()
        {
            UserContext userContext = new UserContext();
            return UserContext.ToList();
        }
    }
}
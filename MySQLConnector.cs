using System;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace LeoForms
{
    public class MySQLConnector
    {
        public static void Main()
        {
            string connStr = "server=database-1.cy1m3s5bdkpt.us-east-2.rds.amazonaws.com;port=3306;database=roaringdb;user=admin;password=DargonBallS051701";
            MySqlConnection conn = new MySqlConnection(connStr);
            try{

            Console.WriteLine("Connecting to MySQL...");
            conn.Open();

        }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();
            Console.WriteLine("Done.");
       
        }
    }
}

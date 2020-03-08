using DAO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                SqlHelper sh = new SqlHelper();
                Song item = new Song();
                item.MusicTitle = "琵琶行";
                item.Singer = "奇然 / 沈谧仁";
                item.Album = "高考必备曲目";
                item.Duration = "05:35";
                item.Id = Guid.NewGuid().ToString("N");
                item.LyricId = Guid.NewGuid().ToString("N");
                item.CommentId = Guid.NewGuid().ToString("N");
                item.IsLike = 1;
                try
                {
                    sh.Save<Song>(item);
                    Console.WriteLine("success");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("fail:" + ex);
                }


                Console.ReadKey();

            }
            catch (Exception ex)
            {
                Console.WriteLine("fail:" + ex);
                Console.ReadKey();
            }
        }
    }
}

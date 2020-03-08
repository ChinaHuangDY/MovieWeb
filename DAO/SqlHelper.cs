using System;
using PetaPoco;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class SqlHelper
    {
        private static Database db;

        public SqlHelper()
        {
            string conStr = "Server=rm-bp1n7f7e7mn40rt947o.mysql.rds.aliyuncs.com;Database=MusicBase;User Id=myroot;Password=Qaz123!123;Pooling=true;";
            db = new PetaPoco.Database(conStr, "MySql.Data.MySqlClient");


            //string conStr = "Data Source = .; Initial Catalog = MusicBase; User Id = sa; Password = 111111;";
            ////Driver={MySQL};Server=myServerAddress;Option=131072;Stmt=;Database=myDataBase; User=myroot;Password=Qaz123!123;
            //db = new PetaPoco.Database(conStr, "System.Data.SqlClient");
        }

        /// <summary>
        /// 列表查询
        /// </summary>
        /// <returns></returns>
        public List<T> GetList<T>()
        {
            string sqlStr = "SELECT * FROM SONGS";
            List<T> list = db.Fetch<T>(sqlStr);
            return list;
        }


        public List<T> GetListById<T>(string name)
        {
            string sqlStr = String.Format("SELECT * FROM SONGS where MusicTitle like %@{0}%", name);
            List<T> list = db.Fetch<T>(sqlStr);
            return list;
        }


        /// <summary>
        /// 保存(新增，修改)
        /// </summary>
        /// <param name="item"></param>
        public void Save<T>(T item)
        {
            db.Insert(item);
            //db.Save(item);
        }


        //GetListById

        #region 示例
        //        //返回一条记录
        //        var a = db.SingleOrDefault<article>("SELECT * FROM articles WHERE article_id=@0", 123));

        //        //返回一条记录，可以省略select，用where开头,会自动查询出全部字段（不是*号）
        //        var a = db.SingleOrDefault<article>("WHERE article_id=@0", 123);

        //        //返回一条记录，可以From开头,会自动查询出全部字段（不是*号）
        //        var a = db.SingleOrDefault<article>("FROM whatever WHERE id=@0", 123);

        //        //如果有主键，可以这样写
        //        var a = db.SingleOrDefault<article>(some_id);

        //        //分页，分页的代码会自动生成
        //        var result = db.Page<article>(1, 20, "SELECT * FROM articles WHERE category=@0 ORDER BY date_posted DESC", "coolstuff");


        //// 逐行查询每条记录，一次只从数据库表中取一条数据
        //foreach (var a in db.Query<article>("SELECT * FROM articles"))
        //{
        //    Console.WriteLine("{0} - {1}", a.article_id, a.title);
        //}

        ////动态查询，返回dynamic，这种方式不支持自动添加Select
        //foreach (var a in db.Fetch<dynamic>("SELECT * FROM articles"))
        //{
        //    Console.WriteLine("{0} - {1}", a.article_id, a.title);
        //}
        ////查询单个字段，返回非Poco对象,支持所有的Type.IsValueType,字符串和byte数组
        //foreach (var x in db.Query<long>("SELECT article_id FROM articles"))
        //{
        //    Console.WriteLine("Article ID: {0}", x);
        //}

        ////检查主键是否存在
        //if (db.Exists<article>(23)) 
        //    db.Delete<article>（23）;



        ////执行Sql，不返回值
        //db.Execute("DELETE FROM articles WHERE draft<>0");

        ////插入记录
        //// Create the article
        //var a = new article();
        //a.title="My new article";
        //a.content="PetaPoco was here";
        //a.date_created=DateTime.UtcNow;
        //// Insert it
        //db.Insert(a);



        ////修改记录
        //// Get a record
        //var a = db.SingleOrDefault<article>("SELECT * FROM articles WHERE article_id=@0", 123);
        //// Change it
        //a.content="PetaPoco was here again";
        //// Save it
        //db.Update(a);

        ////修改一个属性更简洁的写法
        //db.Update("articles", "article_id", new { title="New title" }, 123);

        ////更新的另一种写法
        //db.Update<article>("SET title=@0 WHERE article_id=@1", "New Title", 123);

        ////更新指定的字段
        //a.Update(new string[] { "title" });
        ////也可以这样更新
        //db.Update<user>(u, new string[] { "title" });


        ////删除记录
        ////通过主键删除
        //db.Delete(a);

        ////自定义删除
        //db.Delete<article>("WHERE article_id=@0", 123);


        ////事务,而且事物可以嵌套哦
        //using(var scope = db.GetTransaction())
        //{
        //    //todo: Do transacted updates here

        //    // Commit
        //    scope.Complete();

        //}


        ////支持存储过程,还不支持out 参数？
        //db.Query<type>("CALL storedproc")     // MySQL stored proc
        //db.Query<type>("EXECUTE stmt")        // MySQL prepared statement
        //db.Query<type>("EXECUTE storedproc")  // SQL Server


        ////执行Sql
        //databaseQuery.Execute("insert into temp1 (t) values (@0)", 
        //                new SqlParameter() { SqlDbType = SqlDbType.VarBinary, Value = DbNull.Value });




        ////组装Sql
        //var id = 123;
        //var a = db.Query<article>(PetaPoco.Sql.Builder
        //    .Append("SELECT * FROM articles")
        //    .Append("WHERE article_id=@0", id)
        //    .Append("AND date_created<@0", DateTime.UtcNow)
        //)


        ////动态组装Sql
        //var id = 123;
        //var sql = PetaPoco.Sql.Builder
        //    .Append("SELECT * FROM articles")
        //    .Append("WHERE article_id=@0", id);

        //if (start_date.HasValue)
        //    sql.Append("AND date_created>=@0", start_date.Value);

        //if (end_date.HasValue)
        //    sql.Append("AND date_created<=@0", end_date.Value);

        //var a = db.Query<article>(sql)

        ////通过命名的参数来组装Sql
        //sql.Append("AND date_created>=@start AND date_created<=@end", 
        //                new 
        //                { 
        //                    start=DateTime.UtcNow.AddDays(-2), 
        //                    end=DateTime.UtcNow 
        //                }
        //            );

        ////组装Sql还可以这样
        //var sql = PetaPoco.Sql.Builder()
        //            .Select("*")
        //            .From("articles")
        //            .Where("date_created < @0", DateTime.UtcNow)
        //            .OrderBy("date_created DESC");

        ////还可以更复杂
        //var sql = Sql.Builder
        //    .Select("*")
        //    .From("articles")
        //    .LeftJoin("comments").On("articles.article_id=comments.article_id");
        #endregion
    }
}

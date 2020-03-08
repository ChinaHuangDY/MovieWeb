using DAO;
using Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace WebServices
{
    [RoutePrefix("api/Songs")]
    public class SongsController : ApiController
    {
        /// <summary>
        /// 获取歌曲列表
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("Get")]
        public IEnumerable<Song> Get()
        {
            SqlHelper sh = new SqlHelper();
            List<Song> list = sh.GetList<Song>();
            return list;
        }

        /// <summary>
        /// 保存
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("Save")]
        public string Save(string value)
        {
            try
            {
                Song item = Newtonsoft.Json.JsonConvert.DeserializeObject<Song>(value);
                SqlHelper sh = new SqlHelper();
                item.Id = Guid.NewGuid().ToString("N");
                item.LyricId = Guid.NewGuid().ToString("N");
                item.CommentId = Guid.NewGuid().ToString("N");
                item.IsLike = 1;
                sh.Save<Song>(item);
                return "保存成功:" + item.Id;
            }
            catch (Exception ex)
            {
                return "保存失败" + ex;
            }

        }

        /// <summary>
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost, Route("UploadFile")]
        public string UploadFile()
        {
            string result = string.Empty;
            try
            {
                string uploadPath = HttpContext.Current.Server.MapPath("~/App_Data/");
                HttpRequest request = System.Web.HttpContext.Current.Request;
                HttpFileCollection fileCollection = request.Files;
                //判断是否有文件
                if (fileCollection.Count > 0)
                {
                    //获取文件
                    HttpPostedFile httpPostedFile = fileCollection[0];
                    string fileExtension = Path.GetExtension(httpPostedFile.FileName);// 文件扩展名
                    string fileName = Guid.NewGuid().ToString() + fileExtension;// 名称
                    string filePath = uploadPath + httpPostedFile.FileName;// 上传路径
                                                                           // 如果目录不存在则要先创建
                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }
                    // 保存新的文件
                    while (File.Exists(filePath))
                    {
                        fileName = Guid.NewGuid().ToString() + fileExtension;
                        filePath = uploadPath + fileName;
                    }
                    httpPostedFile.SaveAs(filePath);
                    result = "上传成功";
                }
                else { result = uploadPath.ToString(); }
            }
            catch (Exception ex)
            {
                result = "上传失败" + ex.ToString();
            }
            return result;
        }


        /// <summary>
        /// 下载文件
        /// </summary>
        [HttpGet, Route("DownloadFile")]
        public void DownloadFile()
        {
            var request = HttpContext.Current.Request;
            NameValueCollection nvCollection = request.Params;
            string fileName = nvCollection.GetValues("fileName")[0];
            string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data/"), fileName);
            if (File.Exists(filePath))
            {
                HttpResponse response = HttpContext.Current.Response;
                response.Clear();
                response.ClearHeaders();
                response.ClearContent();
                response.Buffer = true;
                response.AddHeader("content-disposition", string.Format("attachment; FileName={0}", fileName));
                response.Charset = "GB2312";
                response.ContentEncoding = Encoding.GetEncoding("GB2312");
                response.ContentType = MimeMapping.GetMimeMapping(fileName);
                response.WriteFile(filePath);
                response.Flush();
                response.Close();
            }
        }

        /// <summary>
        /// 返回视频文件
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("GetVideo/{Index}")]
        public IHttpActionResult GetVideo(int Index)
        {
            var path = HostingEnvironment.MapPath("~/App_Data/Video/" + Index + ".mp4");
            var f = new FileInfo(path);
            if (!f.Exists)
            {
                return new StatusCodeResult(HttpStatusCode.NotFound, this);
            }
            return new FileStreamResult(f.OpenRead(), "video/mp4");
        }


        /// <summary>
        /// 返回图片
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("GetImage")]
        public IHttpActionResult GetImage()
        {
            var path = HostingEnvironment.MapPath("~/App_Data/Images/1.jpg");
            var f = new FileInfo(path);
            if (!f.Exists)
            {
                return new StatusCodeResult(HttpStatusCode.NotFound, this);
            }
            return new FileStreamResult(f.OpenRead(), "image/jpg");
        }


        /// <summary>
        /// 返回音频文件
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("GetAudio")]
        public IHttpActionResult GetAudio()
        {
            var path = HostingEnvironment.MapPath("~/App_Data/en-嚣张.mp3");
            var f = new FileInfo(path);
            if (!f.Exists)
            {
                return new StatusCodeResult(HttpStatusCode.NotFound, this);
            }
            return new FileStreamResult(f.OpenRead(), "audio/mp3");
        }


        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        [HttpPut]
        public string Put(string JsonParameter)
        {
            return JsonParameter;
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }



        [HttpGet]
        public IHttpActionResult getJson()
        {
            //var list = new List<userinfo>();
            //list.Add(new userinfo { Name = "jeck", age = 22 });
            //list.Add(new userinfo { Name = "poor", age = 23 });
            //return Json<List<userinfo>>(list);

            return null;

        }
    }
}
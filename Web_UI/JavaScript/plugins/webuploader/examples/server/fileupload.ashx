﻿<%@ WebHandler Language="C#" Class="fileupload" %>

using System;
using System.Web;
using System.IO;
using System.Text;

public class fileupload : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        //指定字符集
        context.Response.ContentEncoding = Encoding.UTF8;
        if (context.Request["REQUEST_METHOD"] == "OPTIONS")
        {
            context.Response.End();
        }

        throw new Exception("文件格式不正确");
        
//        SaveFile();
    }
    
    
     /// <summary>
        /// 文件保存操作
        /// </summary>
        /// <param name="basePath"></param>
    private void SaveFile(string basePath = "~/UploadFiles/Images/")
        {
            var name = "";//
            basePath = (basePath.IndexOf("~") > -1) ? System.Web.HttpContext.Current.Server.MapPath(basePath) :
            basePath;
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            //如果目录不存在，则创建目录
            if (!Directory.Exists(basePath))
            {
                Directory.CreateDirectory(basePath);
            }
 
            var suffix = files[0].ContentType.Split('/');
            //获取文件格式
            var _suffix = suffix[1].Equals("jpeg",StringComparison.CurrentCultureIgnoreCase) ? "" : suffix[1];
            var _temp = System.Web.HttpContext.Current.Request["name"];
            //如果不修改文件名，则创建随机文件名
            if (!string.IsNullOrEmpty(_temp))
            {
                name = _temp;
            }
            else
            {
                Random rand = new Random(24 * (int)DateTime.Now.Ticks);
                name = rand.Next() + "." + _suffix;
            }
            //文件保存
            var full = basePath + name;
            files[0].SaveAs(full);
            var _result = "{\"jsonrpc\" : \"2.0\", \"result\" : null, \"id\" : \"" + name + "\"}";
            System.Web.HttpContext.Current.Response.Write(_result);
        }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}
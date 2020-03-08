<%@ WebHandler Language="C#" Class="fileupload" %>

using System;
using System.Web;
using System.IO;
using System.Text;

public class fileupload : IHttpHandler
{
    string saveFolderPath = "";
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //指定字符集
        context.Response.ContentEncoding = Encoding.UTF8;
        saveFolderPath = context.Request["savePath"];

        if (string.IsNullOrEmpty(saveFolderPath))
        {
            saveFolderPath = "UploadFiles/Others/";
        }

        if (saveFolderPath.Substring(saveFolderPath.Length - 1, 1) != "/")
        {
            saveFolderPath = saveFolderPath + "/";
        }

        if (context.Request["REQUEST_METHOD"] == "OPTIONS")
        {
            context.Response.End();
        }
        SaveFile();
    }


    /// <summary>
    /// 文件保存操作
    /// </summary>
    /// <param name="basePath"></param>
    private void SaveFile()
    {
        string basePath = "~/" + saveFolderPath;
        string relativePath = saveFolderPath;


        string sourceFileName = System.Web.HttpContext.Current.Request["name"];

        basePath = (basePath.IndexOf("~") > -1) ? System.Web.HttpContext.Current.Server.MapPath(basePath) :
        basePath;
        HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
        //如果目录不存在，则创建目录



        string extPath = DateTime.Now.ToString("yyyyMM", System.Globalization.DateTimeFormatInfo.InvariantInfo);
        extPath += "/" + DateTime.Now.ToString("dd", System.Globalization.DateTimeFormatInfo.InvariantInfo) + "/";

        String fileExt = Path.GetExtension(sourceFileName).ToLower();

        //String saveFileName = DateTime.Now.ToString("yyyyMMddHHmmssffff", System.Globalization.DateTimeFormatInfo.InvariantInfo) + fileExt;
        String saveFileName = Guid.NewGuid().ToString("N") + fileExt;
        string saveFullFolder = basePath + extPath;


        if (!Directory.Exists(saveFullFolder))
        {
            Directory.CreateDirectory(saveFullFolder);
        }


        //文件保存
        var savePath = saveFullFolder + saveFileName;
        relativePath = relativePath + extPath + saveFileName;
        files[0].SaveAs(savePath);
        relativePath = System.Web.HttpUtility.UrlEncode(relativePath);
        var _result = "{\"FileName\" : \"" + sourceFileName + "\",\"SaveName\" : \"" + saveFileName + "\", \"SavePath\" : \"" + relativePath + "\"}";
        //var _result = "{\"jsonrpc\" : \"2.0\", \"result\" : " + _fileInfo + ", \"id\" : \"" + name + "\"}";

        System.Web.HttpContext.Current.Response.Write(_result);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
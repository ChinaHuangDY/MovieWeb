<%@ WebHandler Language="C#" Class="saveimage" %>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Imaging;

public class saveimage : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        try
        {
            string imagedata = context.Request.Params[0];

            string stringNull = "image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAABsCAYAAAALxefKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADMSURBVHhe7cEBDQAAAMKg909tDwcEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHKgB2YoAAdHrEkgAAAAASUVORK5CYII=";
             string strJSON="";
            if (stringNull.Trim() == imagedata.Trim())
            {
                strJSON = "{\"ErrorCode\":\"" + "2" + "\"}";
                context.Response.Write(strJSON);
                return;
            }
            string aaa = imagedata.Replace("image/png;base64,", "");
            byte[] bytes = Convert.FromBase64String(aaa);

            string Path = "UploadFiles/MeetingApply/Sign/";
            string newTempFilePath = context.Server.MapPath("~/" + Path);
            if (System.IO.Directory.Exists(newTempFilePath) == false)
            {//创建文件夹
                System.IO.Directory.CreateDirectory(newTempFilePath);
            }
            string SaveName= DateTime.Now.ToString("ffff") + ".jpg";
            string SavePath = Path + SaveName;
            FileStream fs = new FileStream(context.Server.MapPath("~/" + SavePath), FileMode.Create, FileAccess.Write);
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(bytes);
            bw.Close();
            fs.Close();

           List<System.Drawing.Image> img = new List<System.Drawing.Image>();
           System.Drawing.Image tmpImg = System.Drawing.Image.FromFile(context.Server.MapPath("~/" + SavePath));

           img.Add(tmpImg);
            //创建要显示的图片对象,根据参数的个数设置宽度
            Bitmap mBitmap = new Bitmap(423, 108);
            Graphics g = Graphics.FromImage(mBitmap);
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
            g.Clear(Color.White);

            g.DrawImageUnscaled(img[0], 0, 0, 423, 108);
            string fileStongPath = "";
            string strPath = "~/UploadFiles/MeetingApply/Sign/" + DateTime.Now.ToString("yyyyMM") + "/";

            //新的文件名
            string newFileName = Guid.NewGuid().ToString("N") + ".jpg";
            string fileCommPath = "";
            fileStongPath = HttpContext.Current.Server.MapPath(strPath);

            if (System.IO.Directory.Exists(fileStongPath) == false)
            {
                System.IO.Directory.CreateDirectory(fileStongPath);
            }

            fileCommPath = fileStongPath + newFileName;

            if (System.IO.File.Exists(fileCommPath) == true)
            {
                System.IO.File.Delete(fileCommPath);
            }
            using (EncoderParameters encoderParameters = new EncoderParameters(1))
            {
                encoderParameters.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);
                mBitmap.Save(fileCommPath, ImageCodecInfo.GetImageEncoders()
                            .Where(x => x.FilenameExtension.Contains(".JPG"))
                            .FirstOrDefault(), encoderParameters);
            }

            for (int i = 0; i < img.Count; i++)
            {
                img[i].Dispose();
            }
            mBitmap.Dispose();
            g.Dispose();
            /*-----这里可以写调用的函数------*/
            strJSON = "{\"SavePath\":\"" + strPath.Replace("~", "")+ newFileName + "\",\"ErrorCode\":\"" + "0" + "\"}";
            context.Response.Write(strJSON);
        }
        catch (Exception ex)
        {

            string strJSON = "{\"ErrorCode\":\"" + "1" + "\"}";
            context.Response.Write(strJSON);
        }

    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
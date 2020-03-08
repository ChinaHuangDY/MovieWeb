﻿<%@ WebHandler Language="C#" Class="ProcessImage" %>

using System;
using System.Web;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Threading;
using System.IO;
using System.Text;

public class ProcessImage : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en-US");
        Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");

        context.Response.ContentType = "text/plain";
        int ID = Convert.ToInt32(context.Request["ID"]);
        float imageH = float.Parse(context.Request["imageH"]);
        float imageW = float.Parse(context.Request["imageW"]);
        float angle = float.Parse(context.Request["imageRotate"]);
        string img_source = context.Request["relativeSource"];
        float imageX = float.Parse(context.Request["imageX"]);
        float imageY = float.Parse(context.Request["imageY"]);
        float selectorH = float.Parse(context.Request["selectorH"]);
        float selectorW = float.Parse(context.Request["selectorW"]);
        float selectorX = float.Parse(context.Request["selectorX"]);
        float selectorY = float.Parse(context.Request["selectorY"]);
        float viewPortH = float.Parse(context.Request["viewPortH"]);
        float viewPortW = float.Parse(context.Request["viewPortW"]);

        //To Values
        float pWidth = imageW;
        float pHeight = imageH;
        Bitmap img = (Bitmap)Bitmap.FromFile(context.Server.MapPath("../"+img_source));
        //Original Values
        int _width = img.Width;
        int _height = img.Height;

        //Resize
        Bitmap image_p = ResizeImage(img, Convert.ToInt32(pWidth), Convert.ToInt32(pHeight));

        int widthR = image_p.Width;
        int heightR = image_p.Height;
        //Rotate if angle is not 0.00 or 360
        if (angle > 0.0F && angle < 360.00F)
        {
            image_p = (Bitmap)RotateImage(image_p, (double)angle);
            pWidth = image_p.Width;
            pHeight = image_p.Height;
        }

        //Calculate Coords of the Image into the ViewPort
        float src_x = 0;
        float dst_x = 0;
        float src_y = 0;
        float dst_y = 0;

        if (pWidth > viewPortW)
        {
            src_x = (float)Math.Abs(imageX - Math.Abs((imageW - pWidth) / 2));
            dst_x = 0;
        }
        else
        {
            src_x = 0;
            dst_x = (float)(imageX + ((imageW - pWidth) / 2));
        }
        if (pHeight > viewPortH)
        {
            src_y = (float)Math.Abs(imageY - Math.Abs((imageH - pHeight) / 2));
            dst_y = 0;
        }
        else
        {
            src_y = 0;
            dst_y = (float)(imageY + ((imageH - pHeight) / 2));
        }


        //Get Image viewed into the ViewPort
        image_p = ImageCopy(image_p, dst_x, dst_y, src_x, src_y, viewPortW, viewPortH, pWidth, pHeight);
        //image_p.Save(context.Server.MapPath("test_viewport.jpg"));
        //Get Selector Portion
        image_p = ImageCopy(image_p, 0, 0, selectorX, selectorY, selectorW, selectorH, viewPortW, viewPortH);
        string FileName = String.Format("userHeadImg{0}.jpg", DateTime.Now.Ticks.ToString());

        string SavePath = System.Web.HttpContext.Current.Server.MapPath("../Images/PLManage/Users/");
        if (Directory.Exists(SavePath) == false)
           {
               Directory.CreateDirectory(SavePath);
           }

        image_p.Save(SavePath+FileName);


        //StringBuilder dataJson = new StringBuilder();
        //dataJson.Append("{");
        //dataJson.AppendFormat("\"FilePath\":\"{0}\"", SavePath);
        //dataJson.AppendFormat(",\"FileName\":\"{0}\"", FileName);
        //dataJson.AppendFormat(",\"FilePathWithName\":\"{0}\"", SavePath + FileName);
        //dataJson.Append("}");
        
        image_p.Dispose();
        img.Dispose();
        //imgSelector.Dispose();
        context.Response.Write("Images/PLManage/Users/" + FileName);
    }


    private Bitmap ImageCopy(Bitmap srcBitmap, float dst_x, float dst_y, float src_x, float src_y, float dst_width, float dst_height, float src_width, float src_height)
    {
        // Create the new bitmap and associated graphics object
        RectangleF SourceRec = new RectangleF(src_x, src_y, dst_width, dst_height);
        RectangleF DestRec = new RectangleF(dst_x, dst_y, dst_width, dst_height);
        Bitmap bmp = new Bitmap(Convert.ToInt32(dst_width), Convert.ToInt32(dst_height));
        Graphics g = Graphics.FromImage(bmp);
        // Draw the specified section of the source bitmap to the new one
        g.DrawImage(srcBitmap, DestRec, SourceRec, GraphicsUnit.Pixel);
        // Clean up
        g.Dispose();

        // Return the bitmap
        return bmp;

    }

    private Bitmap ResizeImage(Bitmap img, int width, int height)
    {
        Image.GetThumbnailImageAbort callback = new Image.GetThumbnailImageAbort(GetThumbAbort);
        return (Bitmap)img.GetThumbnailImage(width, height, callback, System.IntPtr.Zero);

    }

    public bool GetThumbAbort()
    {
        return false;
    }

    private Image RotateImage(Bitmap img, double rotationAngle)
    {
        //create an empty Bitmap image
        Bitmap bmp = new Bitmap(img.Width, img.Height);

        //turn the Bitmap into a Graphics object
        Graphics gfx = Graphics.FromImage(bmp);

        //now we set the rotation point to the center of our image
        gfx.TranslateTransform((float)bmp.Width / 2, (float)bmp.Height / 2);

        //now rotate the image
        gfx.RotateTransform((float)rotationAngle);

        gfx.TranslateTransform(-(float)bmp.Width / 2, -(float)bmp.Height / 2);

        //set the InterpolationMode to HighQualityBicubic so to ensure a high
        //quality image once it is transformed to the specified size
        gfx.InterpolationMode = InterpolationMode.HighQualityBicubic;

        //now draw our new image onto the graphics object
        gfx.DrawImage(img, new Point(0, 0));

        //dispose of our Graphics object
        gfx.Dispose();

        //return the image
        return bmp;
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}
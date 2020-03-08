﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class jSignature_master_Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            string aaa = "image/png;base64,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";


            byte[] bytes = Convert.FromBase64String(aaa.Replace("image/png;base64,",""));
            //MemoryStream memStream = new MemoryStream(bytes);
            //BinaryFormatter binFormatter = new BinaryFormatter();
            //Image img = (Image)binFormatter.Deserialize(memStream);

            FileStream fs = new FileStream(Server.MapPath("a.png"), FileMode.Create, FileAccess.Write);
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(bytes);
            bw.Close();
            fs.Close();
            //Response.Write(path);
        
        }
    }
    /// <summary>
    /// 将图片数据转换为Base64字符串
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void ToBase64(object sender, EventArgs e)
    {
        //Image img = this.pictureBox.Image;
        //BinaryFormatter binFormatter = new BinaryFormatter();
        //MemoryStream memStream = new MemoryStream();
        //binFormatter.Serialize(memStream, img);
        //byte[] bytes = memStream.GetBuffer();
        //string base64 = Convert.ToBase64String(bytes);
        //this.richTextBox.Text = base64;
    }

    /// <summary>
    /// 将Base64字符串转换为图片
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void ToImage(object sender, EventArgs e)
    {
 
    }

   
}
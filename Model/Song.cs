using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    //歌单
    [TableName("Songs")]
    public class Song
    {
        /// <summary>
        /// ID
        /// </summary>
        [Column("Id")]
        public string Id { get; set; }

        /// <summary>
        /// 音乐标题
        /// </summary>
        [Column("MusicTitle")]
        public string MusicTitle { get; set; }

        /// <summary>
        /// 歌手
        /// </summary>
        [Column("Singer")]
        public string Singer { get; set; }

        /// <summary>
        /// 专辑
        /// </summary>
        [Column("Album")]
        public string Album { get; set; }

        /// <summary>
        /// 时长
        /// </summary>
        [Column("Duration")]
        public string Duration { get; set; }

        /// <summary>
        /// 歌词ID
        /// </summary>
        [Column("LyricId")]
        public string LyricId { get; set; }

        /// <summary>
        /// 评论ID
        /// </summary>
        [Column("CommentId")]
        public string CommentId { get; set; }

        /// <summary>
        /// 是否喜欢
        /// </summary>
        [Column("IsLike")]
        public int IsLike { get; set; }

    }
}

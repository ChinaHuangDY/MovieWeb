using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 歌词
    /// </summary>
    [TableName("Lyrics")]
    public class Lyrics
    {
        /// <summary>
        /// ID
        /// </summary>
        [Column("Id")]
        public string Id { get; set; }

        /// <summary>
        /// 歌曲ID
        /// </summary>
        [Column("SongId")]
        public string SongId { get; set; }

        /// <summary>
        /// 作曲
        /// </summary>
        [Column("ComposingMusic")]
        public string ComposingMusic { get; set; }

        /// <summary>
        /// 作词
        /// </summary>
        [Column("Lyricist")]
        public string Lyricist { get; set; }

        /// <summary>
        /// 编曲
        /// </summary>
        [Column("Arranger")]
        public string Arranger { get; set; }

        /// <summary>
        /// 歌词内容
        /// </summary>
        [Column("LyricsContent")]
        public string LyricsContent { get; set; }
    }
}

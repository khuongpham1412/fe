import Image from "next/image";
import {
  TwitterOutlined,
  InstagramOutlined,
  StarOutlined,
  HeartOutlined,
} from "@ant-design/icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center px-44 py-5 bg-gradient-to-b from-[#272b37] to-[#27916e]">
        <div className="flex max-w-5xl w-full items-center justify-between font-mono text-sm flex-row">
          <div className="text-white">web hights</div>
          <div className="flex flex-row justify-center items-center">
            <div className="mr-4">
              <TwitterOutlined style={{ fontSize: "20px", color: "white" }} />
            </div>
            <div className="mr-4">
              <InstagramOutlined style={{ fontSize: "20px", color: "white" }} />
            </div>
            <button className="mr-4 text-white">Login</button>
            <button className="bg-transparent border-[#50ae83] px-4 py-2 border-2 rounded-md text-white">
              Create Account
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center py-16">
          <div className="w-[50%]">
            <div>
              <p className="text-3xl font-bold text-white">
                Empower Your Knowledge Journey
              </p>
            </div>
            <div>
              <p className="py-8 text-white">
                Productivity Highlighter for any Website or PDF. Free and easy
                to use without signing up. Highlight text, create tags, take
                notes and export your research to popular platforms like Notion,
                Obsidian, and more.
              </p>
              <p>hello 1</p>
              <p>hello 1</p>
              <p>hello 1</p>
              <p>hello 1</p>
            </div>
            <button className="bg-[#50ae83] rounded-md px-6 py-2 text-white">
              Add to Chrome - its free
            </button>
            <div className="py-5">
              <StarOutlined style={{ color: "white", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "white", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "white", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "white", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "white", paddingRight: "2px" }} />
              <p className="text-white">4.8 (40,000+ users)</p>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="w-[100%] h-64 bg-red-300"></div>
          </div>
        </div>
      </div>

      <div className="px-40 bg-stone-50">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center">
            <p className="text-3xl font-bold pt-8 pr-1">Our Wall Of Love</p>
            <HeartOutlined style={{ fontSize: "20px", color: "red" }} />
          </div>
          <p className="py-8 align-middle text-[#4b5563]">
            We are loved by students, online readers, and many others seeking
            enhanced digital experiences. With 4.7 out of 5 stars we are the
            best-rated PDF & Web Highlighter in the Chrome Store. Our users
            testimonials are the best social proof we can get!
          </p>
          <button className="bg-[#50ae83] rounded-md px-6 py-2 text-white">
            Start Hightlighting - its free
          </button>
        </div>

        <div className="flex flex-row w-[100%] flex-wrap justify-center py-10 ">
          <div className="w-[30%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package. Warning, you
              may not be able to do without once you use for a while. Thank you
              Marius!
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md px-12 shadow-md hover:bg-[#f9fafb] transition-all inline">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package.
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md pb-2 px-12 shadow-md hover:bg-[#f9fafb] transition-all inline">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package jsgiu
              jsdndoiisisn snvisdibbsjkvsj. This extension should have existed
              since browsers became a thing. Its useful, well designed,
              intuitive, and beautiful! Fast, no bugs, also useful for iDFs. Its
              the whole package jsgiu jsdndoiisisn snvisdibbsjkvsj. This
              extension should have existed since browsers became a thing. Its
              useful, well designed, intuitive, and beautiful! Fast, no bugs,
              also useful for iDFs. Its the whole package jsgiu jsdndoiisisn
              snvisdibbsjkvsj.
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package. Warning, you
              may not be able to do without once you use for a while. Thank you
              Marius!
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package. Warning, you
              may not be able to do without once you use for a while. Thank you
              Marius!
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package. Warning, you
              may not be able to do without once you use for a while. Thank you
              Marius!
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
          <div className="w-[30%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all">
            <div className="flex flex-row justify-center items-center my-4">
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
              <StarOutlined style={{ color: "#fde047", paddingRight: "2px" }} />
            </div>
            <p className="text-[#4b5563] text-center italic my-4">
              This extension should have existed since browsers became a thing.
              Its useful, well designed, intuitive, and beautiful! Fast, no
              bugs, also useful for iDFs. Its the whole package. Warning, you
              may not be able to do without once you use for a while. Thank you
              Marius!
            </p>
            <div className="flex flex-row">
              <div className="w-5 h-5 rounded-lg bg-red-400"></div>
              <p className="text-[#101827] font-bold px-2">Daniel</p>
              <p> | </p>
              <p className="text-[#6a7489] px-2">8/25/2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-40 bg-stone-50">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center">
            <p className="text-3xl font-bold pt-8 pr-1">How to get Started</p>
            <HeartOutlined style={{ fontSize: "20px", color: "red" }} />
          </div>
        </div>

        <div className="flex flex-row w-[100%] flex-wrap justify-center py-10 ">
          <div className="w-[50%] bg-white rounded-md px-8 py-6 shadow-md hover:bg-[#f9fafb] transition-all flex flex-row">
            <div className="w-[70%] flex flex-col my-4">
              <h1 className="px-2 pb-3 text-2xl">Welcome To Web Highlight</h1>
              <p className="py-2 px-2 text-[4b5563]">
                Abc ddef ghi djsh sjjfniw ksfid ksfnfj kdfnj jsdbjsf jsfjbsh
                jsbfjshjf jjsdhbjsd jsbdbjs jshbsd jbsdvbhj jsbhbhss jsbj
              </p>
            </div>
            <div className="w-[30%] flex flex-row">
              <img
                src="https://cdn.trangcongnghe.com.vn/uploads/posts/2023-06/1685953069_image.webp"
                alt="khong tải được"
              />
            </div>
          </div>

          <div className="w-[50%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all flex flex-row">
            <div className="w-[70%] flex flex-col my-4">
              <h2 className="px-2">Welcome To Web Highlights</h2>
              <p className="py-2 px-2 text-[4b5563]">
                Abc ddef ghi djsh sjjfniw ksfid ksfnfj kdfnj jsdbjsf jsfjbsh
                jsbfjshjf jjsdhbjsd jsbdbjs jshbsd jbsdvbhj jsbhbhss jsbj
              </p>
            </div>
            <div className="w-[30%] flex flex-row">
              <img
                src="https://cdn.trangcongnghe.com.vn/uploads/posts/2023-06/1685953069_image.webp"
                alt="khong tải được"
              />
            </div>
          </div>

          <div className="w-[50%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all flex flex-row">
            <div className="w-[70%] flex flex-col my-4">
              <h2 className="px-2">Welcome To Web Highlights</h2>
              <p className="py-2 px-2 text-[4b5563]">
                Abc ddef ghi djsh sjjfniw ksfid ksfnfj kdfnj jsdbjsf jsfjbsh
                jsbfjshjf jjsdhbjsd jsbdbjs jshbsd jbsdvbhj jsbhbhss jsbj
              </p>
            </div>
            <div className="w-[30%] flex flex-row">
              <img
                src="https://cdn.trangcongnghe.com.vn/uploads/posts/2023-06/1685953069_image.webp"
                alt="khong tải được"
              />
            </div>
          </div>

          <div className="w-[50%] bg-white rounded-md px-12 py-6 shadow-md hover:bg-[#f9fafb] transition-all flex flex-row">
            <div className="w-[70%] flex flex-col my-4">
              <h2 className="px-2">Welcome To Web Highlights</h2>
              <p className="py-2 px-2 text-[4b5563]">
                Abc ddef ghi djsh sjjfniw ksfid ksfnfj kdfnj jsdbjsf jsfjbsh
                jsbfjshjf jjsdhbjsd jsbdbjs jshbsd jbsdvbhj jsbhbhss jsbj
              </p>
            </div>
            <div className="w-[30%] flex flex-row">
              <img
                src="https://cdn.trangcongnghe.com.vn/uploads/posts/2023-06/1685953069_image.webp"
                alt="khong tải được"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-1 bg-black"></div>
        <div className="flex flex-col justify-center items-center">
          <h1>Start using Web Highlights today.</h1>
          <button className="bg-[#50ae83] rounded-md px-6 py-2 text-white">
            Add to Chrome - its free
          </button>
          <p>Marius Bongarts Web & App Entwicklung</p>
          <p>Sentmaringer Weg 87</p>
          <p>48151 Muenster</p>
          <div className="flex flex-row justify-center items-center">
            <p>Blog</p>
            <p>FAQ</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Imprint</p>
          </div>
        </div>
      </div>

      <div className="wave-container">
        <div className="wave"></div>
      </div>
    </main>
  );
}

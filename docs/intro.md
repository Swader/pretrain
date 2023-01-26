---
sidebar_position: 1
---

# Tutorial Intro

Pretrain hosts volumes of knowledge known as Booklets specifically polished to be included in ChatGPT so that it can _learn_ what you want it to learn and help you expand this content with tutorials, explanations, or customer support.

Through Pretrain, ChatGPT turns into a powerful, creative coworker, on par with team members who may have been with your project for years.

## Training ChatGPT

Get started by choosing a Booklet in the left sidebar.

On each page, read the content if you wish to learn it too, then scroll down to Training Content and click the Copy button. 

Paste the content into ChatGPT's prompt input.

Do not attempt to paste and submit multiple pages at once - ChatGPT has an input size limit.

After you submit each page, either wait for ChatGPT to give you the summary, or interrupt the response generation by clicking Stop Generating to speed up the process.

Once done, ask ChatGPT about anything it just learned.

## Contributing

If you are a coder, please see [our github](https://github.com/swader/pretrain). If you would like to add your own Booklets, the process is:

- write a [MarkDown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) document with the content you want ChatGPT to know. We recommend a simple tool like [HackMD](https://hackmd.io).
- polish the document such that headings and code are clearly separated and semantically correct (use [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) syntax correctly)
- try to feed the content into ChatGPT such that it stops complaining about input size, and make sure the cutoff points are headings. For example, a document with three sections: "Section 1", "Section 2", "Section 3", each with 1000 words, might be too long if submitted with all three at once. As a next step, submit "Section 1" and "Section 2" together and see if that works - do not try to submit half of "Section 3" as well. This separation by heading is important for humans, not ChatGPT - so that Booklets on Pretrain remain human-readable and categorizable, as well as searchable by the top-right Algolia search widget.
- every page needs to have two sections: human readable information, and a Training Data section. The Training Data section is identical to the human readable part above it, but indented by 1 tab (4 spaces) in order to be rendered as raw markdown which is more suitable for pasting into ChatGPT.
- a prepared booklet will have
  - sanitized and semantically and syntactically correct content
  - content split up by sections in sizes that ChatGPT accepts
  - a title for each section / page
- submit this Booklet as a pull request to the Pretrain repository, and modify the `sidebars.js` file such that it contains the Booklet pages and appears in the sidebar. Alternatively, package the Booklet up into a zip file and send it over to bruno@rmrk.app
- if this gains popularity, we will make a UI through which it will be simpler to submit Booklets.
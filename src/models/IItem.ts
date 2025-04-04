export interface IItem {
    displayLink: string; 
    formattedUrl: string; 
    htmlFormattedUrl: string; 
    htmlSnippet: string; 
    htmlTitle: string; 
    kind: string; 
    link: string;
    snippet: string, 
    pagemap: {
      cse_thumbnail?: IItemThumbnail[]
    }; 
    title: string; 
  }
  
  export interface IItemThumbnail {
    height: string,
    src:  string,
    width: string,
  }
  
  export interface APIResponse {
    items: IItem[]
  }
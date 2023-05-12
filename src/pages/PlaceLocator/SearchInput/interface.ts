export interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
export interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
    description: string;
    place_id: string,
    reference: string,
    structured_formatting: StructuredFormatting;
}
  
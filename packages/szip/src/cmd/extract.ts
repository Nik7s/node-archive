import { ContentLike } from '@/types';
import { BIN_PATH } from '@szip/bin';
import { execa } from 'execa';
import type { Writable as WritableStream } from 'node:stream';

type SZipExtractOptions = {
  // -ai (Include archives)
  includeArchives?: boolean;
  // -an (Disable parsing of archive_name)
  disableParsingArchiveName?: boolean;
  // -ao (Overwrite mode)
  overwriteMode?: string;
  // -ax (Exclude archives)
  excludeArchives?: boolean;
  // -i (Include)
  include?: string[];
  // -m (Method)
  method?: string;
  // -o (Set Output Directory)
  outDir?: string;
  // -p (Set Password)
  password?: string;
  // -r (Recurse)
  recurse?: boolean;
  // -si (use StdIn)
  stdin?: ContentLike;
  // -sni (Store NT security information)
  storeNTSecurityInformation?: boolean;
  // -sns (Store NTFS alternate Streams)
  storeNTFSAlternateStreams?: boolean;
  // -so (use StdOut)
  stdout?: WritableStream;
  // -spf (Use fully qualified file paths)
  fullyQualifiedPaths?: boolean;
  // -spm (Require path separator mark for directory path)
  requirePathSeparator?: boolean;
  // -stx (Exclude archive type)
  excludeArchiveType?: boolean;
  // -t (Type of archive)
  type?: string;
  // -x (Exclude)
  exclude?: string[];
  // -y (Assume Yes on all queries)
  assumeYes?: boolean;
  // -scrc (Set hash method)
  hashMethod?: string;
  // -w (Working Dir)
  cwd?: string;
};

export async function extract(filename: string, options: SZipExtractOptions) {
  const args = ['e', filename];

  // Examples:
  // 7z e archive.zip
  // 7z e archive.zip -oc:\soft *.cpp -r

  const result = await execa(BIN_PATH, args, {
    cwd: options?.cwd
  });

  return result.stdout || result.stderr;
}

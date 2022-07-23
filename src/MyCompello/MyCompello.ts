import SftpClient from 'ssh2-sftp-client';
import { ConnectConfig } from 'ssh2';

/**
 * @class MyCompello
 * @classdesc The MyCompello class is a wrapper for the SFTP client.
 * It provides the ability to read and write files to a SFTP server.
 * @arg {ConnectConfig} config - The SFTP client options.
 * @arg {String} config.host - The SFTP server hostname.
 * @arg {Number} config.port - The SFTP server port.
 * @arg {String} config.username - The SFTP server username.
 * @arg {String} config.password - The SFTP server password.
 */
export default class MyCompello {
  private client: SftpClient;

  private config: ConnectConfig;

  constructor(config: ConnectConfig) {
    this.config = config;
    this.client = new SftpClient();
  }

  /**
   * Initialize the SFTP client connection
   * @returns Promise<SftpClient>
   */
  public async connect(): Promise<SftpClient> {
    await this.client.connect(this.config).catch((err: Error) => {
      throw err;
    });
    return this.client;
  }

  /**
   * Fetches a list of files from the provided path
   * @param remotePath {string}
   * @returns {Promise<SftpClient.FileInfo[]>}
   */
  public async list(remotePath: string): Promise<SftpClient.FileInfo[]> {
    const client = await this.connect();
    const files = await client.list(remotePath);
    await client.end();
    return files;
  }

  /**
   * Check if the provided file exists
   * @param remotePath {string}
   * @returns {Promise<string | boolean>}
   */
  public async exists(remotePath: string): Promise<string | boolean> {
    const client = await this.connect();
    const exists = await client.exists(remotePath);
    await client.end();
    return exists;
  }

  /**
   * Retrieve a file from path.
   * @param remotePath {string}
   * @param localPath {string | NodeJS.WritableStream | undefined}
   * @param options {SftpClient.TransferOptions | undefined}
   * @returns {Promise<string | Buffer | NodeJS.WritableStream>}
   */
  public async get(
    remotePath: string,
    localPath?: string | NodeJS.WritableStream | undefined,
    options?: SftpClient.TransferOptions,
  ): Promise<string | Buffer | NodeJS.WritableStream> {
    const client = await this.connect();
    const file = await client.get(remotePath, localPath, options);
    await client.end();
    return file;
  }

  /**
   * Downloads a file at path to dst using parallel reads for faster throughput
   * @param remotePath {string}
   * @param localPath {string}
   * @param options {SftpClient.TransferOptions | undefined}
   * @returns {Promise<string>}
   */
  public async fastGet(
    remotePath: string,
    localPath: string,
    options?: SftpClient.FastGetTransferOptions,
  ): Promise<string> {
    const client = await this.connect();
    const file = await client.fastGet(remotePath, localPath, options);
    await client.end();
    return file;
  }

  /**
   * Uploads a file to path
   * @param input {string | Buffer | NodeJS.ReadableStream}
   * @param remotePath {string}
   * @param options {SftpClient.TransferOptions | undefined}
   * @returns {Promise<string | Buffer | NodeJS.ReadableStream>}
   */
  public async put(
    input: string | Buffer | NodeJS.ReadableStream,
    remotePath: string,
    options?: SftpClient.TransferOptions,
  ): Promise<string | Buffer | NodeJS.ReadableStream> {
    const client = await this.connect();
    const file = await client.put(input, remotePath, options);
    await client.end();
    return file;
  }

  /**
   * Uploads a file to path using concurrency
   * @param localPath {string}
   * @param remotePath {string}
   * @param options {SftpClient.TransferOptions | undefined}
   * @returns
   */
  public async fastPut(
    localPath: string,
    remotePath: string,
    options?: SftpClient.FastPutTransferOptions,
  ): Promise<string | Buffer | NodeJS.ReadableStream> {
    const client = await this.connect();
    const file = await client.fastPut(localPath, remotePath, options);
    await client.end();
    return file;
  }

  /**
   * Append data to remote file.
   * @param input {Buffer | NodeJS.ReadableStream}
   * @param remotePath {string}
   * @param options {SftpClient.TransferOptions | undefined}
   * @returns {Promise<string>}
   */
  public async append(
    input: Buffer | NodeJS.ReadableStream,
    remotePath: string,
    options?: SftpClient.WriteStreamOptions,
  ): Promise<string | Buffer | NodeJS.ReadableStream> {
    const client = await this.connect();
    const file = await client.append(input, remotePath, options);
    await client.end();
    return file;
  }

  /**
   * Create a directory at path
   * @param remotePath {string}
   * @param recursive {boolean}
   * @returns {Promise<string>}
   */
  public async mkdir(remotePath: string, recursive?: boolean): Promise<string> {
    const client = await this.connect();
    const result = await client.mkdir(remotePath, recursive);
    await client.end();
    return result;
  }

  /**
   * Removes a directory at path
   * @param remotePath {string}
   * @param recursive {boolean}
   * @returns {Promise<string>}
   */
  public async rmdir(remotePath: string, recursive?: boolean): Promise<string> {
    const client = await this.connect();
    const result = await client.rmdir(remotePath, recursive);
    await client.end();
    return result;
  }

  /**
   * Delete a file on the remote server.
   * @param remotePath {string}
   * @param noError {boolean}
   */
  public async delete(remotePath: string, noError?: boolean): Promise<string> {
    const client = await this.connect();
    const result = await client.delete(remotePath, noError);
    await client.end();
    return result;
  }

  /**
   * Rename a file or directory.
   * @param fromPath {string}
   * @param toPath {string}
   * @returns {Promise<string>}
   */
  public async rename(fromPath: string, toPath: string): Promise<string> {
    const client = await this.connect();
    const result = await client.rename(fromPath, toPath);
    await client.end();
    return result;
  }

  /**
   * Uses openSSH POSIX rename extension to rename a file or directory.
   * @param fromPath {string}
   * @param toPath {stirng}
   * @returns {Promise<string>}
   */
  public async posixRename(fromPath: string, toPath: string): Promise<string> {
    const client = await this.connect();
    const result = await client.posixRename(fromPath, toPath);
    await client.end();
    return result;
  }

  /**
   * Change the mode (read, write or execution permssions) of a file.
   * @param remotePath {string}
   * @param mode {string}
   * @returns {Promise<string>}
   */
  public async chmod(remotePath: string, mode: string): Promise<string> {
    const client = await this.connect();
    const result = await client.chmod(remotePath, mode);
    await client.end();
    return result;
  }

  /**
   * Upload the contents of a local file to a remote file.
   * @param localPath {string}
   * @param remotePath {string}
   * @param filter {string | RegExp}
   * @returns {Promise<string>}
   */
  public async uploadDir(
    localPath: string,
    remotePath: string,
    filter?: string | RegExp,
  ): Promise<string> {
    const client = await this.connect();
    const result = await client.uploadDir(localPath, remotePath, filter);
    await client.end();
    return result;
  }

  /**
   * Download the contents of a remote file to a local file path.
   * @param localPath
   * @param remotePath
   * @param filter
   * @returns {Promise<string>}
   */
  public async downloadDir(
    remotePath: string,
    localPath: string,
    filter?: string | RegExp,
  ): Promise<string> {
    const client = await this.connect();
    const result = await client.downloadDir(remotePath, localPath, filter);
    await client.end();
    return result;
  }
}

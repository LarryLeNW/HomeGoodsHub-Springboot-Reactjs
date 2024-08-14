package com.backend.managerFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("")
@RestController
public class FileManagerRestController {
	
//	@Autowired
//	FileManagerService fileservice;
//	
//	@GetMapping("api/files/{foldel}/{file}")
//	public byte[] download(@PathVariable("folder") String folder , @PathVariable("file") String file ) {
//		return fileservice.save(folder,file);
//	}
//	@PostMapping("api/files/{folder}")
//	public List<String> upload(@PathVariable("folder") String folder, @PathVariable("files") MultipartFile[] files ){
//		return fileservice.save(folder,files);
//	}
	
     
}

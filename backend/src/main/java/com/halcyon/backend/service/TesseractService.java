package com.halcyon.backend.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
public class TesseractService {

    private final Tesseract tesseract;

    public TesseractService()  {
        this.tesseract = new Tesseract();
        
        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
        tesseract.setLanguage("rus+eng");
    }

    public String recognizeText(MultipartFile imageFile) throws IOException, TesseractException {
        BufferedImage image = ImageIO.read(imageFile.getInputStream());

        if (image == null) {
            throw new IOException("Failed to read image file. It might be corrupted or in an unsupported format.");
        }

        return tesseract.doOCR(image);
    }
}
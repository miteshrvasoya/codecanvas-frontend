import { Router } from 'express';
import { geminiLibrary } from '../library/geminiLibrary';

const router = Router();

router.post('/', async (req:any, res:any) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    let geminiLibraryObj = new geminiLibrary();
    let result = await geminiLibraryObj.generateCode(prompt);
    console.log('result: ', result);
    // Placeholder for code generation logic
    res.json({ html: `<div>${result.response.text()}</div>`, css: '', js: '' });
});

export default router;
